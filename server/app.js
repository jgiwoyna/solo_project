var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var events = require('./routes/event-data');
var mongoConnection = require('./modules/mongo-connection');
var mongoose = require('mongoose');

var portDecision = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/events', events);

app.get('/', function(req, res){
  res.sendFile(path.resolve('./public/views/index.html'));
});


mongoConnection.connect();

app.listen(portDecision, function(){
  console.log("Listening on port: ", portDecision);
});
