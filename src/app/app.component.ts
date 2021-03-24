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

  ngOnInit() {
    this.taskService.getTasks();
  }
}
