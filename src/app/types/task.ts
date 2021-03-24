export interface Task {
  taskId: number;
  name: string;
  difficulty?: number;
  progress?: number;
}

export default Task;
