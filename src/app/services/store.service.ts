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
    tasks: [
      {
        userId: 1,
        taskId: 2,
        description: "Test Task",
        taskStatus: "In Progress"
      }
    ]
  };

  private _stateUpdateCount = new BehaviorSubject<number>(0);
  get stateUpdateCount() {
    return this._stateUpdateCount.value;
  }

  constructor() {
    super(StoreService.defaultState);

    const state$ = this.selectAsync(s => s);
    state$.pipe(skip(1)).subscribe(s => {
      this._stateUpdateCount.next(this._stateUpdateCount.value + 1);
    });
  }
}
