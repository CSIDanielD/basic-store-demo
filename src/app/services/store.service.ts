import { Injectable } from "@angular/core";
import { asapScheduler, BehaviorSubject, scheduled } from "rxjs";
import AppState from "../types/appState";
import ActionReducer from "../types/basic-store/actionReducer";

@Injectable({ providedIn: "root" })
export class StoreService {
  private _appState = new BehaviorSubject<AppState>({
    tasks: [],
    notes: []
  });

  public get appState() {
    return this._appState.asObservable();
  }

  private _actionReducers = new BehaviorSubject<{
    [actionKey: string]: ActionReducer<AppState>;
  }>({});

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

  registerAction(
    actionReducer: ActionReducer<AppState>,
    replaceExisting?: boolean
  ) {
    const key = actionReducer.action;
    if (replaceExisting && this._actionReducers.value[key]) {
      throw new Error(`Already registered reducer for action ${key}!`);
    }

    this._actionReducers.value[key] = actionReducer;
  }
}
