import AppState from "../types/appState";
import ActionReducer from "../types/basic-store/actionReducer";

type Action = { type: string };

type PayloadActionReducer<A extends Action, S> =
  | ((action: A, getState: () => S) => S)
  | ((action: A, getState: () => S) => Promise<S>);

class ActionStore<S, A extends Action> {
  dispatchAction(action: A) {}
}

interface TestA {
  type: "TestA";
  a: string;
}

interface TestB {
  type: "TestB";
  b: number;
}

interface TestC {
  type: "TestC";
  b: number;
}

type ActionsA = TestA | TestB;
type ActionsB = TestC;
type Actions = ActionsA | ActionsB;

class ConcreteStore extends ActionStore<AppState, Actions> {}

const store = new ConcreteStore();
store.dispatchAction({ a: "5" });
