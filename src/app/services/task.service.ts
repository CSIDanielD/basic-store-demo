import { Injectable, OnInit } from "@angular/core";
import { FakeBackendService } from "./fake-backend.service";
import { StoreService } from "./store.service";
import Note from "../types/note";
import UserTask from "../types/userTask";

@Injectable({ providedIn: "root" })
export class TaskService implements OnInit {
  constructor(
    private store: StoreService,
    private fakeBackend: FakeBackendService
  ) {
    this.store.registerAction<UserTask[]>("getTasks", (s, tasks) => {
      s.tasks = tasks;
      return s;
    });
  }

  async getTasks() {
    const tasks = await this.fakeBackend.getTasks().toPromise();
    this.store.dispatchAction("getTasks", tasks);
  }

  ngOnInit() {}
}
