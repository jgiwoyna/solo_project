var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventsSchema = new Schema({
  bands: { type: String, required: true },
  venue: { type: String, required: true },
  date: Date,
  time: Number,
  cover: String
});

var Events = mongoose.model('Events', eventsSchema);

module.exports = Events;
