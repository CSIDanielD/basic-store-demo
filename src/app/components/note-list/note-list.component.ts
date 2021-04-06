import { Component, OnInit } from "@angular/core";
import { StoreService } from "../../services/store.service";

@Component({
  selector: "app-note-list",
  templateUrl: "./note-list.component.html",
  styleUrls: ["./note-list.component.css"]
})
export class NoteListComponent implements OnInit {
  constructor(private store: StoreService) {}

  // get notes$() {
  //   return this.store.selectAsync(s => s.notes);
  // }

  ngOnInit() {}
}
