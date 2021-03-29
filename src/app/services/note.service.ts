import { Injectable } from "@angular/core";
import { FakeBackendService } from "./fake-backend.service";
import { StoreService } from "./store.service";
import { AppState } from "../types/appState";
import { ActionReducer } from "../types/basic-store/actionReducer";
import { ActionContext } from "../types/basic-store/actionContext";

@Injectable({ providedIn: "root" })
export class NoteService {
  constructor(
    private store: StoreService,
    private fakeBackend: FakeBackendService
  ) {
    const context = new ActionContext(this.store, this);
    context.registerAction("getNotes", this.getNotes);
  }

  private getNotes: ActionReducer<AppState> = async (action, getState) => {
    const notes = await this.fakeBackend.getNotes().toPromise();

    console.log("Got notes:", notes);

    const s = this.store.select(s => s);
    s.notes = notes;
    return s;
  };
}
