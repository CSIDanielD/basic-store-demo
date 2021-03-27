import AppState from "../types/appState";
import ActionReducer from "../types/basic-store/actionReducer";

type Action = { type: string };

type PayloadActionReducer<A extends Action, S> =
  | ((action: A, getState: () => S) => S)
  | ((action: A, getState: () => S) => Promise<S>);

/** Got this from NGXS's Action decorator definition */

export interface ActionDef<T = any, U = any> {
  type: string;

  new (...args: T[]): U;
}

export type ActionType = ActionDef | { type: string };

/** Registers the action on the provided store and provides the store's state and action type
 *  to the method's parameters.
 */
function Action<S, P = any>(): MethodDecorator {
  return (target: any, name: string | symbol) => {
    return;
  };
}

/* Maybe make an AsyncAction decorator that will wait until the 
   provided async observable emits until the ActionReducer is called?
   That way, nobody has to worry about doing a getState() after the await,
   and we don't run into mysterious old state overwrites.
*/

class ActionContext<S> {
  Action<A extends ActionType>(): MethodDecorator {
    return (target: any, name: string | symbol) => {};
  }
}

class Store<S> {
  dispatch<A extends ActionType>(action: A) {}
}

class UserActionProvider {}

class ConcreteStore extends Store<AppState> {}

const store = new ConcreteStore();
