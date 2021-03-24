import { Injectable } from "@angular/core";
import { asapScheduler, BehaviorSubject, scheduled, Subject } from "rxjs";
import AppState from "../types/appState";
import ActionReducer from "../types/basic-store/actionReducer";

@Injectable({ providedIn: "root" })
export class StoreService {
  private _appState = new BehaviorSubject<AppState>({
    tasks: [],
    notes: []
  });

  private _actionReducers = new BehaviorSubject<{
    [actionKey: string]: ActionReducer<AppState, any>;
  }>({});

  private _dispatch = new Subject<{ action: string; args: any }>();

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

  select<T>(selector: (state: AppState) => T) {
    return scheduled([selector(this._appState.value)], asapScheduler);
  }

  // TODO: Eventually let consumers supply a 'selector' in the registerAction fn that gets them the state they want,
  // then they can just do selectedState = newValue, and we automatically handle the object
  // immutability aspect behind the scenes.

  registerAction<P>(
    action: string,
    actionReducer: ActionReducer<AppState, P>,
    replaceExisting?: boolean
  ) {
    if (replaceExisting && this._actionReducers.value[action]) {
      throw new Error(`Already registered reducer for action ${action}!`);
    }

    this._actionReducers.value[action] = actionReducer;
  }

  dispatchAction<P>(action: string, args: P) {
    this._dispatch.next({ action: action, args: args });
  }

  /** Update the store's state according to the given action's registered reducer.  */
  private _commitAction<P>(action: string, args: P) {
    const reducer = this._actionReducers.value[action];
    if (!reducer) {
      console.log("Reducers are:", { ...this._actionReducers.value }, reducer);
      throw new Error(`No reducer for action '${action}'!`);
    }

    const newState = reducer({ ...this._appState.value }, args);
    this._appState.next(newState);

    console.log("New state:", this._appState.value);
  }

  constructor() {
    this._dispatch.subscribe(action => {
      this._commitAction(action.action, action.args);
    });
  }
}
