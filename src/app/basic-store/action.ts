export interface Action<P = any> {
  type: string;
  payload: P;
}

export type ActionCreator<P> = (payload: P) => Action<P>;
export type ActionCreatorWithoutPayload = () => Action<undefined>;
