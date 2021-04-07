import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { skip } from "rxjs/operators";
import { createProviderFrom } from "../basic-store/actionProvider";
import { BasicStore } from "../basic-store/basicStore";
import { defaultState } from "../state/defaultState";
import { NoteService } from "./note.service";
import { UserService } from "./user.service";

@Injectable({ providedIn: "root" })
export class StoreService {
  // Create a ReducerMap from all the actions provided by the injected services.
  private _actionProviders = createProviderFrom({
    ...this.userService
  }).mergeProvider({ ...this.noteService });

  // Create the store instance with the default state and registered providers
  store = new BasicStore(defaultState, this._actionProviders.provider);

  /**
   * A convenience object containing every action key mapped to its action creator.
   * @use Use the object destructuring syntax to extract whichever registered action(s) you
   * need like this: `const { actionA, actionB } = store.actions;`
   */
  get actions() {
    return this.store.actions;
  }

  /** Get the registered action by the given actionType. If you only need a single action, this is a more efficient way of retriving it.  */
  getAction = this.store.getAction;

  /**
   * Select all or a part of the current state value synchronously.
   * @param selector The selector that will be called with the current state value.
   */
  select = this.store.select;

  /**
   * Select all or a part of the current state value synchronously.
   * @param selector The selector that will be called with the current state value.
   */
  selectAsync = this.store.selectAsync;

  /**
   * Dispatch an action to update the current state. This is the only way to update the state's value.
   * @param action The action to dispatch. The action's 'type' string must match one of the registered reducers.
   */
  dispatch = this.store.dispatch;

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
      .subscribe(s => {
        console.log("State update:", s);
        this._stateUpdateCount.next(this._stateUpdateCount.value + 1);
      });
  }
}
