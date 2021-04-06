export interface Action<P = any> {
  type: string;
  payload: P;
}

// TODO: Find a way to make payload required without mandating non-payload actions to provide an argument.
export type ActionCreator<P> = (payload?: P) => Action<P>;
export type ActionCreatorWithoutPayload = () => Action<undefined>;
