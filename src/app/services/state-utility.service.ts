import { Injectable } from "@angular/core";
import { withState } from "../basic-store/actionContext";
import {
  Reducer,
  ReducerWithoutPayload,
  ReducerWithPayload
} from "../basic-store/reducer";
import { IsUnknown } from "../basic-store/utilityTypes";
import { defaultState } from "../state/defaultState";
import { AppState } from "../types/appState";

const context = withState<AppState>();

@Injectable({ providedIn: "root" })
export class StateUtilityService {
  constructor() {}

  // TODO: Fix createReducer returning 'any' if payload arg isn't provided.
  resetState = context.createReducer(getState => {
    return { ...defaultState };
  });
}
