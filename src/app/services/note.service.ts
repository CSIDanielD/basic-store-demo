import { Injectable } from "@angular/core";
import { StoreService } from "./store.service";

@Injectable({ providedIn: "root" })
export class NoteService {
  constructor(private store: StoreService) {}
}
