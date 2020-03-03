import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators, FormBuilder, FormArray, ValidatorFn} from "@angular/forms";
import {IEvent, EventResolved, ISession} from "./event.model";
import {Observable} from "rxjs";
import {EventService} from "./event.service";
import {MatSnackBar} from "@angular/material";

@Component({
  templateUrl: './new-event.component.html',
  styles: [`
    em {
      float: right;
      color: #E05C65;
      padding-left: 10px;
    }

    .error input {
      background-color: #E3C3C5;
    }

    .error ::-webkit-input-placeholder {
      color: #999;
    }

    .error ::-moz-placeholder {
      color: #999;
    }

    .error :-moz-placeholder {
      color: #999;
    }

    .error :ms-input-placeholder {
      color: #999;
    }
  `]
})
export class NewEventComponent implements OnInit {
  constructor(private fb: FormBuilder, private  eventService: EventService, public snackBar: MatSnackBar) {
  }

  events: IEvent[]
  categorys: string[];
  event: IEvent[];
  // categorys: Observable<string[]>

  // newEventForm: FormGroup;
  ngOnInit(): void {
    console.log('iam started');
    this.eventService.getCategorys().subscribe(
      category => {
        this.categorys = category;
      });
    this.eventService.fetchEvent().subscribe(
      event => {
        this.events = event;
        for (let i = 0; i < this.events.length; i++) {
          this.categorys = this.categorys.map(c => c !== this.events[i].category ? c : undefined);
        }
      });
    console.log('the remaining categories', this.categorys);
  }

  // categorys = ['sustainability','nature','animal welfare','housing','education','community','food'];
  newEventForm = this.fb.group({
    category: new FormControl('', Validators.required),
    organizer: new FormControl('', [
      Validators.required, Validators.minLength(4)]),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.pattern('[0-9].*')]),
    notification: 'address',
    location: this.fb.group({
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    }),
    onlineUrl: new FormControl(''),
    sendSession: new FormControl('true'),
    sessions: this.fb.array([this.buildSession()])

    // session:this.fb.array([
    //   this.fb.control('')
    // ])
    // name: new FormControl('',Validators.required),
    // presenter: new FormControl('',Validators.required),
    // duration:new FormControl('',Validators.required),
    // time: new FormControl('',Validators.required),
    // show: new FormControl('',Validators.required),
    // abstract: new FormControl('',Validators.required),


  });

  get category() {
    return this.newEventForm.get('category');
  }

  get organizer() {
    return this.newEventForm.get('organizer');
  }

  get title() {
    return this.newEventForm.get('title');
  }

  get description() {
    return this.newEventForm.get('description');
  }

  get date() {
    return this.newEventForm.get('date');
  }

  get price() {
    return this.newEventForm.get('price');
  }

  get address() {
    return this.newEventForm.controls.location.get('address');
  }

  get city() {
    return this.newEventForm.controls.location.get('city');
  }

  get country() {
    return this.newEventForm.controls.location.get('country');
  }

  get onlineUrl() {
    return this.newEventForm.get('onlineUrl');
  }

  // get session(){
  //   return this.newEventForm.get('session') as FormArray;
  // }
  get sessions(): FormArray {
    return <FormArray>this.newEventForm.get('sessions');
  }

  addsession() {
    this.sessions.push(this.buildSession());
  }

  deletesession(no: number) {
    this.sessions.removeAt(no);
  }

  buildSession(): FormGroup {
    return this.fb.group({
      sessionId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      presenter: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      time: ['', [Validators.required]],
      show: ['', [Validators.required]],
      abstract: ['', [Validators.required]],
      // attendees: [[], [Validators.required]]
    });
  }


  save() {
    console.log('Saved: ' + JSON.stringify(this.newEventForm.value, null, 2));
    this.eventService.addEvent(this.newEventForm.value).subscribe((data: IEvent) => {
      console.log('the added event are', data);
      this.snackBar.open(`event ${data.category} added successfully`, 'ok', {
        duration: 3000
      });
    });
  }

  setNotification(note: string): void {
    const url = this.newEventForm.get('onlineUrl');
    if (note === 'onlineUrl') {
      url.setValidators(Validators.required);
      url.updateValueAndValidity({onlySelf: true});

    } else {
      url.clearValidators();
      url.updateValueAndValidity({onlySelf: true});

    }
    // url.updateValueAndValidity();
    const address = this.newEventForm.get('location');
    if (note === 'address') {
      address.setValidators(Validators.required);
      address.updateValueAndValidity({onlySelf: true});

    } else {
      address.clearValidators();
      address.updateValueAndValidity({onlySelf: true});

    }
    // address.updateValueAndValidity();
  }

  // get name() {
  //   return this.newEventForm.controls.sessions.get('name');
  // }
  //
  // get presenter() {
  //   return this.newEventForm.controls.sessions.get('presenter');
  // }
  //
  // get duration() {
  //   return this.newEventForm.controls.sessions.get('duration');
  // }
  //
  // get time() {
  //   return this.newEventForm.controls.sessions.get('time');
  // }
  //
  // get show() {
  //   return this.newEventForm.controls.sessions.get('show');
  // }
  //
  // get abstract() {
  //   return this.newEventForm.controls.sessions.get('abstract');
  // }

}
