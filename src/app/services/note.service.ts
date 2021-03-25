import { Injectable } from "@angular/core";
import AppState from "../types/appState";
import ActionReducer from "../types/basic-store/actionReducer";
import BasicStore from "../types/basic-store/basicStore";
import { FakeBackendService } from "./fake-backend.service";
import { StoreService } from "./store.service";

class ActionContext<S> {
  constructor(private store: BasicStore<S>, private thisRef: any) {}

  registerAction<P = any>(action: string, actionReducer: ActionReducer<S, P>) {
    this.store.registerAction(action, actionReducer.bind(this.thisRef));
  }
}

@Injectable({ providedIn: "root" })
export class NoteService {
  constructor(
    private store: StoreService,
    private fakeBackend: FakeBackendService
  ) {
    const context = new ActionContext(this.store, this);
    context.registerAction("getNotes", this.getNotes);
  }

  private getNotes: ActionReducer<AppState> = async getState => {
    const notes = await this.fakeBackend.getNotes().toPromise();

    const s = getState();
    s.notes = notes;
    return s;
  };
}
