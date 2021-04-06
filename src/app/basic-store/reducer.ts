export type Reducer<S, P> =
  | ((getState: () => S, payload: P) => S)
  | ((getState: () => S, payload: P) => Promise<S>);

export type ReducerMap<S = any, P = any> = {
  [actionType: string]: Reducer<S, P>;
};
