export interface ActionReducer<S> {
  action: string;
  reducer: (state: S, ...args: any) => S;
}

export default ActionReducer;
