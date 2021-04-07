import {
  InferPayloadFromReducer,
  InferStateFromReducer,
  IsNonUndefined,
  IsUnknown
} from "./utilityTypes";

// export type Reducer<S, P> = IsNonUndefined<
//   P,
//   IsUnknown<P, ReducerWithoutPayload<S>, ReducerWithPayload<S, P>>,
//   ReducerWithoutPayload<S> // If reducer has an unknown or undefined payload, it's a ReducerWithoutPayload
// >;

export type Reducer<S, P = any> =
  | ReducerWithPayload<S, P>
  | ReducerWithoutPayload<S>;

export type ReducerWithPayload<S, P> =
  | ((getState: () => S, payload: P) => S)
  | ((getState: () => S, payload: P) => Promise<S>);

export type ReducerWithoutPayload<S> =
  | ((getState: () => S) => S)
  | ((getState: () => S) => Promise<S>);

export type ReducerMap<S = any, P = any> = {
  [actionType: string]: Reducer<S, P>;
};

export interface ReducerMeta {
  hasPayload: boolean;
}

export type PreparedReducer<R extends Reducer<any, any>> = {
  reducer: R;
  meta: ReducerMeta;
};

export type PreparedReducerMap<R extends Reducer<any, any>> = {
  [actionType: string]: PreparedReducer<R>;
};

// function testWithState<S>() {
//   function withPayload<P>() {
//     function createReducer<R extends ReducerWithPayload<S, P>>(reducer: R) {
//       return {
//         reducer: reducer,
//         meta: { hasPayload: true }
//       } as PreparedReducer<R>;
//     }

//     return { createReducer: createReducer };
//   }

//   function createReducer<R extends ReducerWithoutPayload<S>>(reducer: R) {
//     return {
//       reducer: reducer,
//       meta: { hasPayload: false }
//     } as PreparedReducer<R>;
//   }

//   return {
//     withPayload: withPayload,
//     createReducer: createReducer
//   };
// }

// interface TestState {
//   color: string;
// }

// const context = testWithState<TestState>();
// class TestProvider {
//   changeColor = context
//     .withPayload<string>()
//     .createReducer((getState, newColor) => {
//       return { ...getState(), color: newColor };
//     });
// }
