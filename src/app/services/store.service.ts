import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { skip } from "rxjs/operators";
import { createProviderFrom } from "../basic-store/actionProvider";
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

  // Create a ReducerMap from all the actions provided by the injected services.
  private _actionProviders = createProviderFrom({
    ...this.userService
  }).mergeProvider({ ...this.noteService });

  // Create the store instance with the default state and registered providers
  store = new BasicStore(
    StoreService.defaultState,
    this._actionProviders.provider
  );

  private _stateUpdateCount = new BehaviorSubject<number>(0);
  get stateUpdateCount() {
    return this._stateUpdateCount.value;
  }

  constructor(
    private userService: UserService,
    private noteService: NoteService
  ) {
    const { getUsersAndTasks, addNote } = this.store.actions;

    // Increment the state update counter when the state changes.
    this.store
      .selectAsync(s => s)
      .pipe(skip(1))
      .subscribe(() =>
        this._stateUpdateCount.next(this._stateUpdateCount.value + 1)
      );
  }
}
