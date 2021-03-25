import { Injectable } from "@angular/core";
import { FakeBackendService } from "./fake-backend.service";
import { StoreService } from "./store.service";
import UserTask from "../types/userTask";

@Injectable({ providedIn: "root" })
export class TaskService {
  constructor(
    private store: StoreService,
    private fakeBackend: FakeBackendService
  ) {
    this.registerGetTasks();
    this.registerAddTask();
    this.registerUpdateTask();
    this.registerRemoveTask();

    this.registerMakeFakeTasks([
      { taskId: 1, name: "Fake Task 1", difficulty: 20, progress: 0.4 },
      { taskId: 1, name: "Fake Task 2", difficulty: 3, progress: 0.9 }
    ]);
  }

  private registerGetTasks() {
    this.store.registerAction<UserTask[]>("getTasks", async getState => {
      const tasks = await this.fakeBackend.getTasks().toPromise();
      const s = getState();

      s.tasks = tasks;
      return s;
    });
  }

  private registerMakeFakeTasks(fakeTasks: UserTask[] = []) {
    this.store.registerAction("makeFakeTasks", getState => {
      const s = getState();

      s.tasks = fakeTasks;
      return s;
    });
  }

  private registerAddTask() {
    this.store.registerAction<UserTask>("addTask", (getState, task) => {
      const s = getState();

      s.tasks.push(task);
      return s;
    });
  }

  private registerUpdateTask() {
    this.store.registerAction("updateTask", (getState, task) => {
      const s = getState();
      const index = s.tasks.findIndex(task);

      if (index > -1) {
        s.tasks.splice(index, 1, task);
      }

      return s;
    });
  }

  private registerRemoveTask() {
    this.store.registerAction("removeTask");
  }
}
