import { BehaviorSubject, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { ActionType } from "../../actionProviders/testActionProvider";
import { ActionReducer } from "./actionReducer";

export class BasicStore<S> {
  protected _appState: BehaviorSubject<S>;
  protected _reducers = new BehaviorSubject<{
    [actionType: string]: ActionReducer<S>;
  }>({});
  protected _dispatch = new Subject<ActionType>();

  select<T>(selector: (state: S, index?: number) => T) {
    return selector({ ...this._appState.value });
  }

  selectAsync<T>(selector: (state: S, index?: number) => T) {
    return this._appState.asObservable().pipe(map(selector));
  }

  registerAction<A extends ActionType>(
    actionType: string,
    reducer: ActionReducer<S, A>,
    replaceExisting = false
  ) {
    if (!replaceExisting && this._reducers.value[actionType]) {
      throw new Error(`Already registered reducer for action '${actionType}'!`);
    }

    const reducers = { ...this._reducers.value };
    reducers[actionType] = reducer;

    this._reducers.next(reducers);
  }

  dispatchAction<A extends ActionType>(action: A) {
    this._dispatch.next(action);
  }

  /** Update the store's state according to the given action's registered reducer.  */
  protected async commitAction<A extends ActionType>(action: A) {
    const reducer = this._reducers.value[action.type];
    if (!reducer) {
      throw new Error(`No reducer assigned for the action '${action.type}'`);
    }

    const evaluatedState = new Promise<S>((resolve, reject) => {
      // This is the function used by actions to resolve the current state
      const stateFn = () => {
        return { ...this._appState.value };
      };

      return resolve(reducer(action, stateFn));
    });

    const newState = await evaluatedState;
    this._appState.next(newState);
  }

  constructor(initialState?: S) {
    this._appState = new BehaviorSubject<S>(initialState);
    this._dispatch.subscribe(a => this.commitAction(a));
  }
}
