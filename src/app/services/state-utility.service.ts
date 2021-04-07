import { Injectable } from "@angular/core";
import { withState } from "../basic-store/actionContext";
import { defaultState } from "../state/defaultState";
import { AppState } from "../types/appState";

const context = withState<AppState>();

@Injectable({ providedIn: "root" })
export class StateUtilityService {
  constructor() {}

  resetState = context.createReducer(getState => {
    return { ...defaultState };
  });
}
