var express = require('express');
var router = express.Router();
var Events = require('../models/events');


router.get('/', function(req, res) {

  Events.find(function(err, events) {
    
    if(err) {
      console.log('Get ERR: ', err);
      res.sendStatus(500);
    } else {
      res.send(events);
    }
  });
});




module.exports = router;
