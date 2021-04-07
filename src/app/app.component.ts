import { Component, OnInit } from "@angular/core";
import { StoreService } from "./services/store.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private store: StoreService) {}

  get updateCount() {
    return this.store.stateUpdateCount;
  }

  ngOnInit() {
    const { getUsersAndTasksAsync, addUserAsync } = this.store.actions;

    // Get all the current users from the "backend".
    this.store.dispatch(getUsersAndTasksAsync());

    // Add a new user
    this.store.dispatch(addUserAsync({ userId: 20, userName: "Bill" }));

    // this.store.dispatchAction("getTasks"); // Async, will update state second.
    // this.store.dispatchAction("makeFakeTasks"); // Synchronous, will update state first.
    // this.store.dispatchAction(new GetNotesAction()); // Async, will update state third.
  }
}
