import { Component, OnInit } from "@angular/core";
import { StoreService } from "../../services/store.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  constructor(private store: StoreService) {}

  get users$() {
    return this.store.selectAsync(s => s.users);
  }

  ngOnInit() {}
}
