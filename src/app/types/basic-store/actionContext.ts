import { ActionReducer } from "./actionReducer";
import { BasicStore } from "./basicStore";

export class ActionContext<S> {
  constructor(private store: BasicStore<S>, private thisRef: any) {}

  registerAction<P = any>(action: string, actionReducer: ActionReducer<S, P>) {
    this.store.registerAction(action, actionReducer.bind(this.thisRef));
  }
}
