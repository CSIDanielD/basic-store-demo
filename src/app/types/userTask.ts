import { TaskStatus } from "./taskStatus";

export interface UserTask {
  userId: number;
  taskId: number;
  taskStatus: TaskStatus;
}
