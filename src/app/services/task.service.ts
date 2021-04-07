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

  addTaskAsync = context.createReducer(async (getState, task: UserTask) => {
    // Fetch & await data from the fake API
    const result = await this.fakeBackend.addTask(task).toPromise();

    // Get the current state after awaiting
    const state = getState();

    if (result) {
      state.tasks.push(task);
    }

    return state;
  });

  updateTaskAsync = context.createReducer(
    async (getState, payload: { taskId: number; task: UserTask }) => {
      // Fetch & await data from the fake API
      const result = await this.fakeBackend
        .updateTask(payload.taskId, payload.task)
        .toPromise();

      // Get the current state after awaiting
      const state = getState();

      if (result) {
        const foundIndex = state.tasks.findIndex(
          t => t.taskId === payload.taskId
        );

        state.tasks.splice(foundIndex, 1, payload.task);
      }

      return state;
    }
  );

  removeTaskAsync = context.createReducer(async (getState, taskId: number) => {
    // Fetch & await data from the fake API
    const result = await this.fakeBackend.removeTask(taskId).toPromise();

    // Get the current state after awaiting
    const state = getState();

    if (result) {
      const foundIndex = state.tasks.findIndex(t => t.taskId === taskId);

      state.tasks.splice(foundIndex, 1);
    }

    return state;
  });
}
