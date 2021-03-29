// export type ActionReducer<S, P = any> =
//   | ((getState: () => S, args: P) => S)
//   | ((getState: () => S, args: P) => Promise<S>);

export type ActionReducer<S, A=any> =
  | ((action: A, getState: () => S) => S)
  | ((action: A, getState: () => S) => Promise<S>);
