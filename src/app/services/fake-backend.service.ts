import { Injectable } from "@angular/core";
import { asyncScheduler, BehaviorSubject, Observable, scheduled } from "rxjs";
import AppState from "../types/appState";
import UserTask from "../types/userTask";
import Note from "../types/note";
import { delay, map, take } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class FakeBackendService {
  private globalDelay = 500;

  private _fakeDatabase = new BehaviorSubject<AppState>({
    tasks: [
      {
        taskId: 1,
        name: "Task 1",
        difficulty: 2,
        progress: 0.5
      },
      {
        taskId: 2,
        name: "Task 2",
        difficulty: 4,
        progress: 1
      },
      {
        taskId: 3,
        name: "Task 3",
        difficulty: 10,
        progress: 0.1
      },
      {
        taskId: 4,
        name: "Task 4",
        difficulty: 7,
        progress: 0.4
      }
    ],
    notes: [
      {
        noteId: 1,
        taskId: 1,
        text: "This one is pretty easy.",
        timestamp: Date.now()
      },
      {
        noteId: 2,
        taskId: 3,
        text: "Wow, this one is really hard!",
        timestamp: Date.now()
      },
      {
        noteId: 3,
        taskId: 4,
        text: "Could I get some more info on this one?",
        timestamp: Date.now()
      }
    ]
  });

  private _nextId = new BehaviorSubject<number>(5);

  private nextId() {
    this._nextId.next(this._nextId.value + 1);
    return this._nextId.value;
  }

  private toDelayedSingleEmitter<T>(obs: Observable<T>, delayAmount: number) {
    return obs
      .pipe(take(1)) // Only emit 1 value (similar to http.get)
      .pipe(delay(delayAmount)); // artifically delay the time until the value is emitted
  }

  getTasks() {
    const obs = this._fakeDatabase.asObservable().pipe(map((v, i) => v.tasks));

    // Delay the value by 100 ms
    return this.toDelayedSingleEmitter(obs, this.globalDelay);
  }

  addTask(task: UserTask) {
    const newTask = { ...task, taskId: this.nextId() };
    const newData = { ...this._fakeDatabase.value };
    [...newData.tasks].push(newTask);

    this._fakeDatabase.next(newData);

    return this.toDelayedSingleEmitter(
      scheduled([true], asyncScheduler),
      this.globalDelay
    );
  }

  updateTask(task: UserTask) {
    const newData = { ...this._fakeDatabase.value };
    const newTasks = [...newData.tasks];

    const taskIndex = newTasks.findIndex(t => t.taskId === task?.taskId);
    if (taskIndex < 0) {
      return this.toDelayedSingleEmitter(
        scheduled([false], asyncScheduler),
        this.globalDelay
      );
    }

    const newTask = newTasks[taskIndex];
    newTasks.splice(taskIndex, 1, newTask);
    
    return this.toDelayedSingleEmitter(
      scheduled([true], asyncScheduler),
      this.globalDelay
    );
  }

  removeTask(taskId: number) {
    const newData = { ...this._fakeDatabase.value };
    const newTasks = [...newData.tasks];

    const taskIndex = newTasks.findIndex(t => t.taskId === taskId);
    if (taskIndex < 0) {
      return this.toDelayedSingleEmitter(
        scheduled([false], asyncScheduler),
        this.globalDelay
      );
    }

    newTasks.splice(taskIndex, 1);
    return this.toDelayedSingleEmitter(
      scheduled([true], asyncScheduler),
      this.globalDelay
    );
  }

  getNotes() {
    const obs = this._fakeDatabase.asObservable().pipe(map((v, i) => v.notes));

    // Delay the value by 100 ms
    return this.toDelayedSingleEmitter(obs, this.globalDelay);
  }

  addNote(note: Note) {
    const newNote = { ...note, noteId: this.nextId() };
    const newData = { ...this._fakeDatabase.value };
    [...newData.notes].push(newNote);

    this._fakeDatabase.next(newData);
    return this.toDelayedSingleEmitter(
      scheduled([true], asyncScheduler),
      this.globalDelay
    );
  }

  updateNote(note: Note) {
    const newData = { ...this._fakeDatabase.value };
    const newNotes = [...newData.notes];

    const noteIndex = newNotes.findIndex(n => n.noteId === note?.noteId);
    if (noteIndex < 0) {
      return this.toDelayedSingleEmitter(
        scheduled([false], asyncScheduler),
        this.globalDelay
      );
    }

    const newNote = newNotes[noteIndex];
    newNotes.splice(noteIndex, 1, newNote);
    
    return this.toDelayedSingleEmitter(
      scheduled([true], asyncScheduler),
      this.globalDelay
    );
  }

  removeNote(noteId: number) {
    const newData = { ...this._fakeDatabase.value };
    const newNotes = [...newData.notes];

    const noteIndex = newNotes.findIndex(n => n.noteId === noteId);
    if (noteIndex < 0) {
      return this.toDelayedSingleEmitter(
        scheduled([false], asyncScheduler),
        this.globalDelay
      );
    }

    newNotes.splice(noteIndex, 1);
    return this.toDelayedSingleEmitter(
      scheduled([true], asyncScheduler),
      this.globalDelay
    );
  }
}
