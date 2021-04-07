import { Component, OnInit } from "@angular/core";
import { StoreService } from "./services/store.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private store: StoreService) {
    const { getUsersAndTasks, addUser } = this.store.actions;
    console.log("Actions:", this.store.actions);

    // // Get all the current users from the "backend".
    // this.store.dispatch(getUsersAndTasks());

    // // Add a new user
    // this.store.dispatch(addUser({ userId: 20, userName: "Bill" }));
  }

  get updateCount() {
    return this.store.stateUpdateCount;
  }

  ngOnInit() {
    // this.store.dispatchAction("getTasks"); // Async, will update state second.
    // this.store.dispatchAction("makeFakeTasks"); // Synchronous, will update state first.
    // this.store.dispatchAction(new GetNotesAction()); // Async, will update state third.
  }
}
