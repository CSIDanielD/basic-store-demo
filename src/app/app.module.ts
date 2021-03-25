import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { StoreService } from "./services/store.service";
import { TaskService } from "./services/task.service";
import { NoteService } from "./services/note.service";
import { FakeBackendService } from "./services/fake-backend.service";
import { TaskListComponent } from './components/task-list/task-list.component';
import { NoteListComponent } from './components/note-list/note-list.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, TaskListComponent, NoteListComponent],
  bootstrap: [AppComponent],
  providers: [StoreService, TaskService, NoteService, FakeBackendService]
})
export class AppModule {}
