import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { skip } from "rxjs/operators";
import { BasicStore } from "../basic-store/basicStore";
import { AppState } from "../types/appState";
import { NoteService } from "./note.service";
import { UserService } from "./user.service";

@Injectable({ providedIn: "root" })
export class StoreService {
  static readonly defaultState: Readonly<AppState> = {
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

  store = new BasicStore(StoreService.defaultState, {});

  private _stateUpdateCount = new BehaviorSubject<number>(0);
  get stateUpdateCount() {
    return this._stateUpdateCount.value;
  }

  constructor(
    private userService: UserService,
    private noteService: NoteService
  ) {
    // Increment the state update counter when the state changes.
    this.store
      .selectAsync(s => s)
      .pipe(skip(1))
      .subscribe(() =>
        this._stateUpdateCount.next(this._stateUpdateCount.value + 1)
      );
  }
}
