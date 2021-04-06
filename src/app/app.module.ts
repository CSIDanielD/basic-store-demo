import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { NoteListComponent } from "./components/note-list/note-list.component";

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, TaskListComponent, NoteListComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}
