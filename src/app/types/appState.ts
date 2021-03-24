import Note from "./note";
import Task from "./task";

export interface AppState {
  tasks: Task[];
  notes: Note[];
}

export default AppState;
