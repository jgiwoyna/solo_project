myApp.controller('EventsController', ['$http', '$compile', 'EventFactory', function($http, $compile, EventFactory) {
  var self = this;
  // self.events = [[{title: 'All Day Event',start: new Date(2016, 11, 1)}, {title: 'Another event',start: new Date(2016, 11, 5)}]];
  self.events = [[]];

  self.getEvent = function() {
    if(EventFactory.eventData() === undefined) {

      EventFactory.updateEvents().then(function(response) {
        for (var i = 0; i < response.length; i++) {
          self.events[0].push(response[i]);
        }
        // self.events = [response];
        self.currentEvent = EventFactory.currentEvent();
        console.log("controller got events from the factory: ", self.events);
      });
    } else {
      self.events = [EventFactory.eventData()];
      self.currentEvent = EventFactory.currentEvent();
    }
  }


  self.createEvent = function(){
    console.log('create event');
    EventFactory.createEvent(self.newEvent)
    .then(function(response) {
      self.events = EventFactory.eventData();
      self.currentEvent = EventFactory.currentEvent();
      console.log('controller create event response ', response.data);
    },
    function(response) {
      console.log('post error: ', response);
    });
  }


  self.uiConfig = {
    calendar:{
      height: 450,
      editable: true,
      header:{
        left: 'month basicWeek basicDay agendaWeek agendaDay',
        center: 'title',
        right: 'today prev,next'
      },
      eventClick: self.alertEventOnClick,
      eventDrop: self.alertOnDrop,
      eventResize: self.alertOnResize
    }
  }

  self.getEvent();




}]);
