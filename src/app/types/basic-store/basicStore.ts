import { asapScheduler, BehaviorSubject, scheduled, Subject } from "rxjs";
import { skip } from "rxjs/operators";
import ActionReducer from "./actionReducer";

export class BasicStore<S extends {}> {
  private _appState: BehaviorSubject<S>;

  private _actionReducers = new BehaviorSubject<{
    [actionKey: string]: ActionReducer<S, any>;
  }>({});

  private _dispatch = new Subject<{ action: string; args: any }>();

  private _stateUpdateCount = new BehaviorSubject<number>(0);

  public get appState() {
    return this._appState.asObservable();
  }

  public get actionReducers() {
    return { ...this._actionReducers.value };
  }

  public set actionReducers(value) {
    this._actionReducers.next(value);
  }

  public get reducerChanges() {
    return this._actionReducers.asObservable();
  }

  public get stateUpdateCount() {
    return this._stateUpdateCount.value;
  }

  select<T>(selector: (state: S) => T) {
    return scheduled([selector(this._appState.value)], asapScheduler);
  }

  // TODO: Eventually let consumers supply a 'selector' in the registerAction fn that gets them the state they want,
  // then they can just do selectedState = newValue, and we automatically handle the object
  // immutability aspect behind the scenes.

  registerAction<P = any>(
    action: string,
    actionReducer?: ActionReducer<S, P>,
    replaceExisting?: boolean
  ) {
    if (!replaceExisting && this._actionReducers.value[action]) {
      throw new Error(`Already registered reducer for action ${action}!`);
    }

    this._actionReducers.value[action] =
      actionReducer ||
      function(s) {
        return s;
      };
  }

  dispatchAction<P = any>(action: string, args?: P) {
    this._dispatch.next({ action: action, args: args });
  }

  /** Update the store's state according to the given action's registered reducer.  */
  private async _commitAction<P>(action: string, args: P) {
    const reducer = this._actionReducers.value[action];
    if (!reducer) {
      throw new Error(`No reducer for action '${action}'!`);
    }

    const evaluatedState = new Promise<S>((resolve, reject) => {
      return resolve(reducer({ ...this._appState.value }, args));
    });

    const newState = await evaluatedState;

    this._appState.next(newState);

    console.log("New state:", this._appState.value);
  }

  constructor(private _initialState?: S) {
    this._appState = new BehaviorSubject(_initialState);

    this._dispatch.subscribe(action => {
      this._commitAction(action.action, action.args);
    });

    this._appState.pipe(skip(1)).subscribe(s => {
      this._stateUpdateCount.next(this.stateUpdateCount + 1);
    });
  }
}
