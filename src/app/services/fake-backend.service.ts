import { Injectable } from "@angular/core";
import {
  asapScheduler,
  asyncScheduler,
  BehaviorSubject,
  Observable,
  scheduled
} from "rxjs";
import { delay, map, take } from "rxjs/operators";
import { AppState } from "../types/appState";
import { Note } from "../types/note";
import { User } from "../types/user";
import { UserTask } from "../types/userTask";

@Injectable({ providedIn: "root" })
export class FakeBackendService {
  private globalDelay = 500;

  private _fakeDatabase = new BehaviorSubject<AppState>({
    users: [
      {
        userId: 4,
        userName: "Jack"
      },
      {
        userId: 7,
        userName: "Jill"
      }
    ],
    tasks: [],
    notes: []
  });

  private _nextId = new BehaviorSubject<number>(5);

  private nextId() {
    this._nextId.next(this._nextId.value + 1);
    return this._nextId.value;
  }

  private toDelayedSingleEmitter<T>(obs: Observable<T>) {
    return obs
      .pipe(take(1)) // Only emit 1 value (similar to http.get)
      .pipe(delay(this.globalDelay)); // artifically delay the time until the value is emitted
  }

  private select<T>(selector: (s: AppState) => T) {
    return selector(this._fakeDatabase.value);
  }

  private selectAsync<T>(selector: (s: AppState, index?: number) => T) {
    return this._fakeDatabase.asObservable().pipe(map(selector));
  }

  private addValue<T extends User | UserTask | Note>(
    selector: (s: AppState) => T[],
    idKey: string,
    value: T
  ) {
    const newData = { ...this.select(s => s) };
    [...selector(newData)].push({...value, value[idKey]=this.nextId()});
    return this.toDelayedSingleEmitter(scheduled([true], asapScheduler));
  }

  private removeValue<T>(selector: (s: AppState) => T) {

  }

  // Demonstrate returning different types of state in one call.
  getUsersAndTasks() {
    return this.toDelayedSingleEmitter(
      this.selectAsync(s => {
        return { users: s.users, tasks: s.tasks };
      })
    );
  }

  getNotes() {
    return this.toDelayedSingleEmitter(this.selectAsync(s => s.notes));
  }

  // addTask(task: UserTask) {
  //   const newTask = { ...task, taskId: this.nextId() };
  //   const newData = { ...this._fakeDatabase.value };
  //   [...newData.tasks].push(newTask);

  //   this._fakeDatabase.next(newData);

  //   return this.toDelayedSingleEmitter(
  //     scheduled([true], asyncScheduler)
  //   );
  // }

  // updateTask(task: UserTask) {
  //   const newData = { ...this._fakeDatabase.value };
  //   const newTasks = [...newData.tasks];

  //   const taskIndex = newTasks.findIndex(t => t.taskId === task?.taskId);
  //   if (taskIndex < 0) {
  //     return this.toDelayedSingleEmitter(
  //       scheduled([false], asyncScheduler),
  //       this.globalDelay
  //     );
  //   }

  //   const newTask = newTasks[taskIndex];
  //   newTasks.splice(taskIndex, 1, newTask);

  //   return this.toDelayedSingleEmitter(
  //     scheduled([true], asyncScheduler),
  //     this.globalDelay
  //   );
  // }

  // removeTask(taskId: number) {
  //   const newData = { ...this._fakeDatabase.value };
  //   const newTasks = [...newData.tasks];

  //   const taskIndex = newTasks.findIndex(t => t.taskId === taskId);
  //   if (taskIndex < 0) {
  //     return this.toDelayedSingleEmitter(
  //       scheduled([false], asyncScheduler),
  //       this.globalDelay
  //     );
  //   }

  //   newTasks.splice(taskIndex, 1);
  //   return this.toDelayedSingleEmitter(
  //     scheduled([true], asyncScheduler),
  //     this.globalDelay
  //   );
  // }

  // getNotes() {
  //   const obs = this._fakeDatabase.asObservable().pipe(map((v, i) => v.notes));

  //   // Delay the value by 100 ms
  //   return this.toDelayedSingleEmitter(obs, this.globalDelay);
  // }

  // addNote(note: Note) {
  //   const newNote = { ...note, noteId: this.nextId() };
  //   const newData = { ...this._fakeDatabase.value };
  //   [...newData.notes].push(newNote);

  //   this._fakeDatabase.next(newData);
  //   return this.toDelayedSingleEmitter(
  //     scheduled([true], asyncScheduler),
  //     this.globalDelay
  //   );
  // }

  // updateNote(note: Note) {
  //   const newData = { ...this._fakeDatabase.value };
  //   const newNotes = [...newData.notes];

  //   const noteIndex = newNotes.findIndex(n => n.noteId === note?.noteId);
  //   if (noteIndex < 0) {
  //     return this.toDelayedSingleEmitter(
  //       scheduled([false], asyncScheduler),
  //       this.globalDelay
  //     );
  //   }

  //   const newNote = newNotes[noteIndex];
  //   newNotes.splice(noteIndex, 1, newNote);

  //   return this.toDelayedSingleEmitter(
  //     scheduled([true], asyncScheduler),
  //     this.globalDelay
  //   );
  // }

  // removeNote(noteId: number) {
  //   const newData = { ...this._fakeDatabase.value };
  //   const newNotes = [...newData.notes];

  //   const noteIndex = newNotes.findIndex(n => n.noteId === noteId);
  //   if (noteIndex < 0) {
  //     return this.toDelayedSingleEmitter(
  //       scheduled([false], asyncScheduler),
  //       this.globalDelay
  //     );
  //   }

  //   newNotes.splice(noteIndex, 1);
  //   return this.toDelayedSingleEmitter(
  //     scheduled([true], asyncScheduler),
  //     this.globalDelay
  //   );
  // }
}
