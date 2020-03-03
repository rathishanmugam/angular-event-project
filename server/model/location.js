const mongoose = require('mongoose');
Schema = mongoose.Schema;
  // objectId = Schema.ObjectId;
const SessionSchema = new Schema({
  address: String,
  city: String,
  country: String
})
module.exports = mongoose.model('Session', SessionSchema);
