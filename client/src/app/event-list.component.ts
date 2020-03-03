import {Component, OnInit} from '@angular/core';
import {EventService} from "./event.service";
import {IEvent} from "./event.model";
import {MatSnackBar} from "@angular/material";

@Component({
  templateUrl: './event-list.component.html',
  styles: [`
    .well{
    display: flex;
    flex-direction: column;
    min-width: 100px;
      background-color: gainsboro;

    }
    .example-card {
      max-width: 400px;
      background-color: gainsboro;
    }
    .pad-left { margin-left: 10px; }
  `]
})
export class EventListComponent implements OnInit{
  events: IEvent[]
  errorMessage: string;

  constructor(private eventService: EventService, private snackBar: MatSnackBar){}
  ngOnInit() {
    console.log('iam executing');
    this.eventService.fetchEvent().subscribe(
      event => {
        this.events = event;
        console.log('the event is', this.events);
      }
      // error => this.errorMessage error
    );
  }
deleteEvent(event) {
  this.eventService.deleteEvent(event._id).subscribe(
    data => {
      console.log('the new item deleted is', event.category);
      this.snackBar.open(`event ${event.category} deleted successfully`, 'ok', {
        duration: 3000
      });
    });
}
}
