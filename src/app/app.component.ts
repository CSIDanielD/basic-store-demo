import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { StoreService } from "./services/store.service";
import { TaskService } from "./services/task.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(public store: StoreService, public taskService: TaskService) {}

  get tasks$() {
    return this.store.appState.pipe(map((v, i) => v.tasks));
  }

  get notes$() {
    return this.store.appState.pipe(map((v, i) => v.notes));
  }

  get updateCount() {
    return this.store.stateUpdateCount;
  }

  ngOnInit() {
    this.store.dispatchAction("getTasks"); // Async, will update state second.
    this.store.dispatchAction("makeFakeTasks"); // Synchronous, will update state first.
  }
}
