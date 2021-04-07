import { Injectable } from "@angular/core";
import { withState } from "../basic-store/actionContext";
import { defaultState } from "../state/defaultState";
import { AppState } from "../types/appState";

// Create a handy context to easily create strongly-type reducer functions
const context = withState<AppState>();

@Injectable({ providedIn: "root" })
export class StateUtilityService {
  constructor() {}

  // TODO: Fix createReducer returning 'any' if payload arg isn't provided.
  resetState = context.createReducer(getState => {
    return { ...defaultState };
  });
}
