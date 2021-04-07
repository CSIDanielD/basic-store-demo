import { AppState } from "../types/appState";

export const defaultState: Readonly<AppState> = {
  users: [],
  notes: [],
  tasks: [
    {
      userId: 1,
      taskId: 2,
      description: "Test Task",
      taskStatus: "In Progress"
    }
  ]
};
