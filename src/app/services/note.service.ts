import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class NoteService {
  constructor(
    private store: StoreService,
    private fakeBackend: FakeBackendService
  ) {}
}
