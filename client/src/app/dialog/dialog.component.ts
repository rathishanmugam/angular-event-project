
import {Component, EventEmitter, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EventService} from "../event.service";
import {FormControl, FormGroup, Validators, FormBuilder,FormArray} from '@angular/forms';
export interface IEvent {
  eventId: number;
  category: string;
  organizer: string;
  title: string;
  description: string;
  date: Date;
  price: number;
  location?: {
    address: string;
    city: string;
    country: string;
  },
  onlineUrl?: string;
  sessions: [
    {
      id: number;
      name: string;
      presenter: string;
      duration: string;
      time: string;
      show: string;
      abstract: string;
      attendees: string[];
    }
    ]
}
export interface ISession {
  sessionId: string
  name: string
  presenter: string
  duration: number
  time:number
  show: string
  abstract: string
  action?: string
  // attendees: string[]
}
@Component({
  // selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public action: string;
  localData: ISession;
  newData: ISession;
  public added: string;

  ngOnInit(): void {}
    newSessionsForm = this.fb.group({
        sessionId: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        presenter: new FormControl('', Validators.required),
        duration: new FormControl('', Validators.required),
        time: new FormControl('', Validators.required),
        show: new FormControl('', Validators.required),
        abstract: new FormControl('', Validators.required)
      })

  get sessionId() { return this.newSessionsForm.get('sessionId'); }
  get name() { return this.newSessionsForm.get('name'); }
  get presenter() { return this.newSessionsForm.get('presenter'); }
  get duration() { return this.newSessionsForm.get('duration'); }
  get time() { return this.newSessionsForm.get('time'); }
  get show() { return this.newSessionsForm.get('show'); }
  get abstract() { return this.newSessionsForm.get('abstract'); }

  public hasError = (controlName: string, errorName: string) => {
    return this.newSessionsForm.controls[controlName].hasError(errorName);
  }
  getErrorMessage() {
    return this.abstract.hasError('required') ? 'You must enter a abstract' :
      // this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  constructor(private eventService: EventService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<DialogComponent>,
              // @Optional() is used to prevent error if no data is passed
              @Optional() @Inject(MAT_DIALOG_DATA) public data: ISession) {
    // console.log("original data: " , this.newSessionsForm.value);


    this.localData = {...data};
    this.added = this.localData.sessionId;
    console.log('old alue' , this.localData);

    this.action = this.localData.action;

  }

  doAction() {
    console.log('old alue form ' ,  { ...this.newSessionsForm.value});

    this.dialogRef.close({event: this.action,  data: { ...this.newSessionsForm.value}, delete: this.localData });
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
}
