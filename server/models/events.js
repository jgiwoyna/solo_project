var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventsSchema = new Schema ({

  title: { type: String, required: true },
  start: Date,
  venue: { type: String, required: true },
  cover: String
  
});

var Events = mongoose.model('Events', eventsSchema);

module.exports = Events;
