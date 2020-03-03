import {Component, OnInit} from '@angular/core';
import {EventService} from "./event.service";
import {IEvent} from "./event.model";

@Component({
    selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    events: IEvent[]
    errorMessage: string;

    constructor(private eventService: EventService) {
    }

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

}
