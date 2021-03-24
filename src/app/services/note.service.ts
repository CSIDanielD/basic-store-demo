import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class NoteService {
  /**
   * At the top of any service that will be modifying global state (i.e. dispatching actions),
   * register your actions like:
   *
   *    const actions = {
   *     'addNote': (state, note) => state.notes.push(note),
   *     'removeNote': (state, note) => state.notes.find(note).remove()  // I know this isn't real syntax
   *    };
   *
   * Then pass it into some registration function like:
   *
   *     // 'selector' is the selector used to get the state we want for the ActionReducers
   *     // It's optional - if not present, we'll pass in the whole state.
   *     store.registerActions(actions, selector?);
   *
   * This will automatically append the actions by key to the global ActionReducers map in the Store:
   *
   * const actionReducers : {[actionKey: string]: Array<ActionReducer>} = {
   *  'addNote': ActionReducer1, ActionReducer2, etc...
   *  'removeNote': ActionReducer3, ActionReducer4, etc...
   * }
   *
   * Then in the service, we dispatch one of our actions...
   *
   * ...which we subscribe to (listen for) in the StoreService. It will look up that action by
   * key, and run ALL the ActionReducers for that action:
   *
   * onActionDispatched(action: Action) {
   *  const reducers = this.actionReducers[action.key];
   *  for (const reducer of reducers) {
   *
   *    // Execute the selector to get the appropriate state to pass in to the reducer..
   *    const selectedState = reducer.selector(this._appState.value);
   *
   *    // Execute the ActionReducer
   *    reducer.execute()
   *  }
   * }
   */

  constructor() {}
}
