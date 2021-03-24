import { Injectable } from "@angular/core";
import { asyncScheduler, scheduled } from "rxjs";
import { delay } from "rxjs/operators";
import { FakeBackendService } from "./fake-backend.service";
import { StoreService } from "./store.service";

@Injectable({ providedIn: "root" })
export class TaskService {
  constructor(
    public store: StoreService,
    public fakeBackend: FakeBackendService
  ) {}

  async getTasks() {
    const tasks = await this.fakeBackend.getTasks().toPromise();
    console.log("Tasks:", tasks);
  }
}
