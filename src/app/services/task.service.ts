import { Injectable } from "@angular/core";
import { FakeBackendService } from "./fake-backend.service";
import { StoreService } from "./store.service";
import { UserTask } from "../types/userTask";

@Injectable({ providedIn: "root" })
export class TaskService {
  constructor(
    private store: StoreService,
    private fakeBackend: FakeBackendService
  ) {}
}
