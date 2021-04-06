import { ActionCreator, ActionCreatorWithoutPayload } from "./action";
import { Reducer, ReducerMap } from "./reducer";
import {
  ActionCreatorFromPropType,
  InferActionReducerFromReducer,
  InferActionReducerMapFromReducerMap
} from "./utilityTypes";

export interface ActionContext<State> {
  readonly createReducer: <R extends Reducer<State, any>>(reducer: R) => R;
  readonly createReducerMap: <M extends ReducerMap<State, any>>(map: M) => M;
  readonly createActionCreator: <P = any>(type: string) => ActionCreator<P>;
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
  function createReducer<R extends Reducer<State, any>>(reducer: R) {
    return reducer;
  }

  function createReducerMap<M extends ReducerMap<State, any>>(map: M): M {
    return map;
  }

  function createActionCreator<P = any>(type: string): ActionCreator<P> {
    const actionType =
      contextName && contextName.trim().length > 0
        ? `${contextName.trim()}/${type.trim()}`
        : `${type.trim()}`;

    return (payload: P) => {
      return { type: actionType, payload: payload };
    };
  }

  function createActionCreatorWithoutPayload(
    type: string
  ): ActionCreatorWithoutPayload {
    const actionType =
      contextName && contextName.trim().length > 0
        ? `${contextName.trim()}/${type.trim()}`
        : `${type.trim()}`;

    return () => {
      return { type: actionType, payload: undefined };
    };
  }

  function createActionReducerMap<M extends ReducerMap<State, any>>(
    reducerMap: M
  ): InferActionReducerMapFromReducerMap<M> {
    const actionReducerMap = Object.entries(reducerMap).reduce(
      (map, entry) => {
        const [actionType, reducer] = entry;

        const actionReducer: InferActionReducerFromReducer<typeof reducer> = {
          actionCreator: createActionCreator(actionType)
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
