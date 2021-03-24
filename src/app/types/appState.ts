import Note from "./note";
import UserTask from "./userTask";

export interface AppState {
  tasks: UserTask[];
  notes: Note[];
}

export default AppState;
