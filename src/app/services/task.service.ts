import { Injectable } from "@angular/core";
import { FakeBackendService } from "./fake-backend.service";
import { UserTask } from "../types/userTask";
import { withState } from "../basic-store/actionContext";
import { AppState } from "../types/appState";

// Create a handy context to easily create strongly-type reducer functions
const context = withState<AppState>();

@Injectable({ providedIn: "root" })
export class TaskService {
  constructor(private fakeBackend: FakeBackendService) {}
}
