// export interface ActionReducer<S> {
//   action: string;
//   reducer: (state: S, ...args: any) => S;
// }

export type ActionReducer<S, P> = (state: S, args: P) => S;

export default ActionReducer;
