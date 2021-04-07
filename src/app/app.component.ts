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

  resetState() {
    const { resetState } = this.store.actions;
    this.store.dispatch(resetState());
  }

  fetchUsersAndTasks() {
    // Demonstrate getting an ActionCreator from the store.actions getter
    const { getUsersAndTasksAsync } = this.store.actions;

    // Get all the current users from the "backend".
    this.store.dispatch(getUsersAndTasksAsync());
  }

  addUsersAndTasks() {
    // Demonstrate getting multiple ActionCreators from the store.actions getter
    const { addUserAsync, addTaskAsync } = this.store.actions;

    // Add some new users
    this.store.dispatch(addUserAsync({ userId: 20, userName: "Bill" }));
    this.store.dispatch(addUserAsync({ userId: 21, userName: "Betty" }));

    // Give them a few tasks
    this.store.dispatch(
      addTaskAsync({
        userId: 20,
        taskId: 2,
        description: "Bill needs to take out the trash",
        taskStatus: "To do"
      })
    );

    this.store.dispatch(
      addTaskAsync({
        userId: 20,
        taskId: 3,
        description: "Do the dishes",
        taskStatus: "Complete"
      })
    );

    this.store.dispatch(
      addTaskAsync({
        userId: 21,
        taskId: 6,
        description: "Do taxes",
        taskStatus: "In Progress"
      })
    );
  }

  ngOnInit() {
    const { addUserAsync } = this.store.actions;
    const addUserAction = addUserAsync({ userId: 1, userName: "Bob" });
    this.store.dispatch(addUserAction);
    // this.store.dispatchAction("getTasks"); // Async, will update state second.
    // this.store.dispatchAction("makeFakeTasks"); // Synchronous, will update state first.
    // this.store.dispatchAction(new GetNotesAction()); // Async, will update state third.
  }
}
