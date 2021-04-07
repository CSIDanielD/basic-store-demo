import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload
} from "./action";
import { Reducer, ReducerMap } from "./reducer";
import {
  InferActionReducerFromReducer,
  InferActionReducerMapFromReducerMap
} from "./utilityTypes";

export interface ActionContext<State> {
  readonly createReducer: <P>(
    reducer:
      | ((getState: () => State, payload?: P) => State)
      | ((getState: () => State, payload?: P) => Promise<State>)
  ) => Reducer<State, P>;

  readonly createReducerMap: <M extends ReducerMap<State, any>>(map: M) => M;

  readonly createActionCreator: <P = any>(
    type: string
  ) => ActionCreatorWithPayload<P> | ActionCreatorWithoutPayload;

  readonly createActionReducerMap: <M extends ReducerMap<State, any>>(
    reducerMap: M
  ) => InferActionReducerMapFromReducerMap<M>;
}

/**
 * Create a "Context" for ActionReducer creation methods. The same as createActionContext,
 * but doesn't allow providing a contextName parameter.
 * @see createActionContext
 */
export function withState<State>() {
  return createActionContext<State>();
}

/**
 * Create a "Context" for ActionReducer creation methods.
 * This is a currying function used to inject the provided State type into its returned methods
 * to allow Typescript's type inference to work correctly. Typescript doesn't support partial
 * type inference (you either provide all generic params or none), so this is the way around that.
 */
export function createActionContext<State>(
  contextName?: string
): ActionContext<State> {
  function createReducer<P>(
    reducer:
      | ((getState: () => State, payload?: P) => State)
      | ((getState: () => State, payload?: P) => Promise<State>)
  ) {
    return reducer as Reducer<State, P>;
  }

  function createReducerMap<M extends ReducerMap<State, any>>(map: M): M {
    return map;
  }

  // function createActionCreator<P>(type: string): ActionCreator<P> {
  function createActionCreator<P>(
    type: string
  ): ActionCreatorWithPayload<P> | ActionCreatorWithoutPayload {
    const actionType =
      contextName && contextName.trim().length > 0
        ? `${contextName.trim()}/${type.trim()}`
        : `${type.trim()}`;

    return (payload: P) => {
      return { type: actionType, payload: payload };
    };
  }

  function createActionReducerMap<M extends ReducerMap<State, any>>(
    reducerMap: M
  ): InferActionReducerMapFromReducerMap<M> {
    const actionReducerMap = Object.entries(reducerMap).reduce(
      (map, entry) => {
        const [actionType, reducer] = entry;

        const actionReducer: InferActionReducerFromReducer<typeof reducer> = {
          actionCreator: createActionCreator(actionType),
          reducer: reducer
        };

        map[actionType] = actionReducer;

        return map;
      },
      {} as { [actionType: string]: any }
    );

    return actionReducerMap as InferActionReducerMapFromReducerMap<M>;
  }

  return {
    createReducer: createReducer,
    createReducerMap: createReducerMap,
    createActionCreator: createActionCreator,
    createActionReducerMap: createActionReducerMap
  };
}
