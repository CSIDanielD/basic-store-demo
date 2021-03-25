export type ActionReducer<S, P> =
  | ((state: S, args: P) => S)
  | ((state: S, args: P) => Promise<S>);

export default ActionReducer;
