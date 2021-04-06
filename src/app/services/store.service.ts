import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { skip } from "rxjs/operators";
import { AppState } from "../types/appState";
import { NoteService } from "./note.service";
import { UserService } from "./user.service";

@Injectable({ providedIn: "root" })
export class StoreService {
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

  constructor(
    private userService: UserService,
    private noteService: NoteService
  ) {}
}
