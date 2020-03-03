import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import {MaterialModule} from "../shared/material.module";
import {AppRoutingModule} from "./app-routing.module";
import {EventDetailComponent} from "./event-detail.component";
import {EventListComponent} from "./event-list.component";
import {DialogComponent} from "./dialog/dialog.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import {NewEventComponent} from "./new-event.component";

@NgModule({
  entryComponents: [
    DialogComponent
  ],
  declarations: [
    AppComponent,
    DialogComponent,
NewEventComponent,
    EventDetailComponent,
      EventListComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
      MaterialModule,
      BrowserAnimationsModule,
      HttpClientModule,
      AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
