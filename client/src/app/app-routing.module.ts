import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventDetailComponent} from "./event-detail.component";
import {EventListComponent} from "./event-list.component";
import {NewEventComponent} from "./new-event.component";

const routes: Routes = [
  {path: 'events/new', component: NewEventComponent},
  {path: 'events', component: EventListComponent},
  {path: 'events/:id', component: EventDetailComponent},
  {path: '', redirectTo: '/events', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
