export interface Action<P = any> {
  type: string;
  payload: P;
}

export type ActionCreator<P = any> = (payload: P) => Action<P>;
