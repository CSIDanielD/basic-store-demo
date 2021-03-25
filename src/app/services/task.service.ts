import { Injectable, OnInit } from "@angular/core";
import { FakeBackendService } from "./fake-backend.service";
import { StoreService } from "./store.service";
import UserTask from "../types/userTask";

@Injectable({ providedIn: "root" })
export class TaskService implements OnInit {
  constructor(
    private store: StoreService,
    private fakeBackend: FakeBackendService
  ) {
    this.store.registerAction<UserTask[]>("getTasks", async s => {
      const tasks = await this.fakeBackend.getTasks().toPromise();
      s.tasks = tasks;
      return s;
    });

    this.store.registerAction<UserTask>("addTask", (s, task) => {
      s.tasks.push(task);
      return s;
    });

    this.store.registerAction("updateTask", (s, task) => {
      const index = s.tasks.findIndex(task);

      if (index > -1) {
        s.tasks.splice(index, 1, task);
      }

      return s;
    });

    this.store.registerAction("removeTask");
  }

  ngOnInit() {}
}
