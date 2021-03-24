import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { StoreService } from "./services/store.service";
import { TaskService } from "./services/task.service";
import { NoteService } from "./services/note.service";
import { FakeBackendService } from './services/fake-backend.service';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [StoreService, TaskService, NoteService, FakeBackendService]
})
export class AppModule {}
