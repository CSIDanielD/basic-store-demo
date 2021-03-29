import { Component, OnInit } from "@angular/core";
import { NoteService } from "./services/note.service";
import { StoreService } from "./services/store.service";
import { TaskService } from "./services/task.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(
    public store: StoreService,
    public taskService: TaskService,
    public noteService: NoteService
  ) {}

  get updateCount() {
    return this.store.stateUpdateCount;
  }

  ngOnInit() {
    // this.store.dispatchAction("getTasks"); // Async, will update state second.
    // this.store.dispatchAction("makeFakeTasks"); // Synchronous, will update state first.
    // this.store.dispatchAction("getNotes"); // Async, will update state third.
  }
}
