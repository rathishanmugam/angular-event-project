const mongoose = require('mongoose');
const {Schema} = mongoose;
location = require('./location');

const sessionSchema = new Schema({
    // eventId:{type: mongoose.Schema.Types.ObjectId,
    // ref: 'Event'},
    // eventId: mongoose.SchemaTypes.ObjectId,
    sessionId: {type: String},
    name: {type: String},
    presenter: {type: String},
    duration: {type: Number},
    time: {type: Number},
    show: {type: String},
    abstract: {type: String}
  // }
})
const locationSchema = new Schema({
    address: {type: String },
    city:{type: String },
    country: {type: String}
})
const eventModel = new Schema(
  {
    category: {type: String },
    organizer: {type: String },
    title: {type: String },
    description: {type: String },
    price: {type: Number },
    date: {type: Date},
      location: location.schema ,

      // location: {type : locationSchema },
    onlineUrl: {type: String},
    sessions:[ sessionSchema ],
  },{strict:false}
);
/*
const isLocation = true
if (isLocation){
  eventModel.add({
    location: {
      address: {type: String},
      city: {type: String},
      country: {type: String}
    }
  })
}else{
  eventModel.add({ onlineUrl: {type: String}})
          attendees: [String]
    sessions: [sessionSchema],
 location: {
      address: String,
      city: String,
      country: String
    },
        location: Session.schema,

}  */

module.exports = mongoose.model('Event', eventModel,'event');


/*
{
   	"eventId":1,
   	"category":"food",
   	"organizer":"shan",
   	"title":"food",
   	"description":"festival",
   	"date":"2/2/2020",
   	"price":120,

   	"location":{
   		"address":"sdsd",
   	"city":"kjli",
   		"country":"india"

   	},
   	"onlineUrl":"",

   	"session":[
   		{"sessionId":1,"name":"tiffen","presenter":"shan","duration":2,"time":1,"show":"morning","abstract":"very yammy"},
   		{"sessionId":2,"name":"lunch","presenter":"shan","duration":3,"time":2,"show":"none","abstract":"ok not bad"}
   		]

   }
 */
