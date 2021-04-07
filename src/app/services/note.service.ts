import { Injectable } from "@angular/core";
import { AppState } from "../types/appState";
import { withState } from "../basic-store/actionContext";
import { FakeBackendService } from "./fake-backend.service";
import { Note } from "../types/note";

// Create a handy context to easily create strongly-type reducer functions
const context = withState<AppState>();

@Injectable({ providedIn: "root" })
export class NoteService {
  constructor(private fakeBackend: FakeBackendService) {}

  getNotesAsync = context.createReducer(async getState => {
    // Fetch & await data from the fake API
    const notes = await this.fakeBackend.getNotes().toPromise();

    // Get the current state after awaiting
    const state = getState();
    state.notes = notes;
    return state;
  });

  addNoteAsync = context.createReducer(async (getState, note: Note) => {
    // Fetch & await data from the fake API
    const result = await this.fakeBackend.addNote(note).toPromise();

    // Get the current state after awaiting
    const state = getState();

    if (result) {
      state.notes.push(note);
    }

    return state;
  });

  updateNoteAsync = context.createReducer(
    async (getState, payload: { noteId: number; note: Note }) => {
      // Fetch & await data from the fake API
      const result = await this.fakeBackend
        .updateNote(payload.noteId, payload.note)
        .toPromise();

      // Get the current state after awaiting
      const state = getState();

      if (result) {
        const foundIndex = state.notes.findIndex(
          n => n.noteId == payload.noteId
        );
        state.notes.splice(foundIndex, 1, payload.note); // Replace the note in the state with the new one.
      }

      return state;
    }
  );

  removeNoteAsync = context.createReducer(async (getState, noteId: number) => {
    // Fetch & await data from the fake API
    const result = await this.fakeBackend.removeNote(noteId).toPromise();

    // Get the current state after awaiting
    const state = getState();

    if (result) {
      const foundIndex = state.notes.findIndex(n => n.noteId == noteId);
      state.notes.splice(foundIndex, 1); // Delete the found note.
    }

    return state;
  });
}
