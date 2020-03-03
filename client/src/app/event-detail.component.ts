import {Component, OnInit} from "@angular/core";
 import {IEvent} from "./event.model";
import {EventService} from "./event.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {MatDialog, MatTable} from "@angular/material";
import {FormControl, FormGroup, Validators, FormBuilder} from "@angular/forms";
import {DialogComponent} from './dialog/dialog.component';
// export interface IEvent {
//   category?: string;
//   organizer?: string;
//   title?: string;
//   description?: string;
//   date?: Date;
//   price?: number;
//   location?: {
//     address: string;
//     city: string;
//     country: string;
//   },
//   onlineUrl?: string;
//   sessions: [
//     {
//        sessionId?: number
//       name: string
//       presenter: string
//       duration: string
//       time: string
//       show: string
//       abstract: string
//       // attendees: string[]
//     }
//     ]
// }
export interface ISession {
  sessionId: string
  name: string
  presenter: string
  duration: string
  time:string
  show: string
  abstract: string
  action?: string
  // attendees: string[]
}
@Component({
  templateUrl: './event-detail.component.html',
  styles: [`
    /*mat-card {*/
    /*  min-width: 100%;*/
    /*  margin: 2em auto;*/
    /*  text-align: center;*/
    /*}*/
    .example-card {
      max-width: 400px;
      background-color: darkgray;
    }

    .event-card {
      max-width: 400px;
      background-color: gainsboro;
    }
  `]
})
export class EventDetailComponent implements OnInit {
   events: IEvent[];
  event: IEvent;
  localData: ISession;
  public added: string;
  constructor(private eventService: EventService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              public snackBar: MatSnackBar,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    console.log('iam in ' , this.route.snapshot.params['id']);

    this.eventService.getEventById(this.route.snapshot.params['id'])
      .subscribe(
        event  => {
          this.event = event;
          console.log('the event is', this.event);
          // this.addMode = false
        });
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      // const added = new Date().toLocaleDateString();
      if (result.event === 'Add') {
        // let id = Math.max.apply(null, this.users.map(s => s.id));
        // let id = this.total;
        //const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
        //     session.id = nextId + 1
        //     this.event.sessions.push(session)
        // if (id > 0) {
        //   id++;
        // } else {
        //   id = 1;
        // }
        console.log('added item', {...result.data} );

        console.log('updated new item', result.data );
        console.log('updated old item', this.event);
        this.event = Object.assign({}, this.event, {sessions: this.event.sessions.concat([result.data])});
        console.log('updated mixed item  with concat', this.event);

        this.event = Object.assign({}, this.event,  {sessions: this.event.sessions.filter(c => c.sessionId === "")});

        // const newObject = Object.assign({},  this.events, {session : result.data});
        console.log('updated mixed with filter item', this.event);

        this.eventService.updateSession( this.event).subscribe(
          data => {
            // this.loadRecordsPage();
            console.log('the new item updated is', data);
            this.snackBar.open(`user ${result.data.name} added successfully`,'ok', {
              duration: 3000
            });
          });
      } else if (result.event === 'Update') {
        console.log('updated new item', result.data );
        console.log('updated old item', this.event);
        this.event = Object.assign({}, this.event, {sessions: this.event.sessions.concat([result.data])},{ action:result.event});
        console.log('updated mixed item  with concat', this.event);

        this.event = Object.assign({}, this.event,  {sessions: this.event.sessions.filter(c => c.sessionId === "")});

        // const newObject = Object.assign({},  this.events, {session : result.data});
        console.log('updated mixed with filter item', this.event);

        this.eventService.updateSession( this.event).subscribe(
          data => {
            // this.loadRecordsPage();
            console.log('the new item updated is', data);
            this.snackBar.open(`user ${result.data.name} updated successfully`,'ok', {
              duration: 3000
            });
          });

      } else if (result.event === 'Delete') {
        this.localData = {...result.delete};
        this.added = this.localData.name;
        console.log('the new item deleted is', this.localData);

        console.log('the new item deleted is', this.added);

        this.event = Object.assign( this.event, {sessions: this.event.sessions.concat([result.data])});
        this.event = Object.assign( this.event,  {sessions: this.event.sessions.filter(c => c.name === this.added )},{action:result.event});

        console.log('the new item deleted is', this.event);
        this.eventService.updateSession( this.event).subscribe(
          data => {
            // this.loadRecordsPage();
            console.log('the new item deleted is', data);
            this.snackBar.open(`user ${this.localData.name} deleted successfully`,'ok', {
              duration: 3000
            });
          });;

      }
    });
  }

  // addSession() {
  //   this.addMode = true
  // }
  // saveNewSession(session:ISession) {
  //   const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
  //   session.id = nextId + 1
  //   console.log('the new event',session);
  //   this.event.sessions.push(session)
  //    this.eventService.updateEvent(this.event)
  //   this.addMode = false
  // }
  //
  // cancelAddSession() {
  //   this.addMode = false
  // }
}
