import { Component, OnInit } from "@angular/core";
import { StoreService } from "../../services/store.service";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.css"]
})
export class TaskListComponent implements OnInit {
  constructor(private store: StoreService) {}

  get tasks$() {
    return this.store.selectAsync(s => s.tasks);
  }

  ngOnInit() {}
}
