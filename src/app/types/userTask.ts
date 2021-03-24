export interface UserTask {
  taskId: number;
  name: string;
  difficulty?: number;
  progress?: number;
}

export default UserTask;
