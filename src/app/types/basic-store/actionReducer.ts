export type ActionReducer<S, A = any> =
  | ((action: A, getState: () => S) => S)
  | ((action: A, getState: () => S) => Promise<S>);
