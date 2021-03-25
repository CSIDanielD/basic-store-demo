export type ActionReducer<S, P = any> =
  | ((getState: () => S, args: P) => S)
  | ((getState: () => S, args: P) => Promise<S>);

export default ActionReducer;
