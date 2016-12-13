var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
var events = require('./routes/event-data');
var create = require('./routes/create-form');
var mongoConnection = require('./modules/mongo-connection');
var mongoose = require('mongoose');

var portDecision = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(path.resolve('./public/views/index.html'));
});

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/events', events);

app.use(decoder.token);

app.use('/create-form', create);

mongoConnection.connect();

app.listen(portDecision, function(){
  console.log("Listening on port: ", portDecision);
});
