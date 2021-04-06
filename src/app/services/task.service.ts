import { Injectable } from "@angular/core";
import { FakeBackendService } from "./fake-backend.service";
import { UserTask } from "../types/userTask";

@Injectable({ providedIn: "root" })
export class TaskService {
  constructor(private fakeBackend: FakeBackendService) {}
}
