import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { skip } from "rxjs/operators";
import { AppState } from "../types/appState";
import { BasicStore } from "../types/basic-store/basicStore";

@Injectable({ providedIn: "root" })
export class StoreService extends BasicStore<AppState> {
  static readonly defaultState: AppState = {
    users: [],
    notes: [],
    tasks: []
  };

  private _stateUpdateCount = new BehaviorSubject<number>(0);
  get stateUpdateCount() {
    return this._stateUpdateCount.value;
  }

  constructor() {
    super(StoreService.defaultState);

    this.appState.pipe(skip(1)).subscribe(s => {
      this._stateUpdateCount.next(this._stateUpdateCount.value + 1);
    });
  }
}
