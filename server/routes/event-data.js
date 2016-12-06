var express = require('express');
var router = express.Router();
var Events = require('../models/events');

router.post('/', function(req, res) {
  console.log('post: ', req.body);
  var addedEvent = new Events(req.body);
  console.log(addedEvent);

  addedEvent.save(function(err, data){
    console.log('save data: ', data);
    if(err) {
      console.log('ERR: ', err);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });

});

router.get('/', function(req, res) {

  Events.find({}, function(err, events) {
    if(err) {
      console.log('Get ERR: ', err);
      res.sendStatus(500);
    } else {
      res.send(events);
    }
  });
});




module.exports = router;
