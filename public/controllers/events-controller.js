myApp.controller('EventsController', ['$http', '$compile', 'EventFactory', function($http, $compile, EventFactory) {
  var self = this;
  // self.events = [[{title: 'All Day Event',start: new Date(2016, 11, 1)}]];
  self.events = [[]];

  self.getEvent = function() {
    if(EventFactory.eventData() === undefined) {

      EventFactory.updateEvents().then(function(response) {
        self.events = [{events: EventFactory.eventData()}];
        self.currentEvent = EventFactory.currentEvent();
        console.log("controller got event from the factory: ", self.events);
      });
    } else {
      self.events = [{events: EventFactory.eventData()}];
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
      eventResize: self.alertOnResize,
      viewRender: function(view, element) {
        self.getEvent(view.start, view.end, function(events) {
          self.events.splice(0, self.events[0].length);
          self.events[0].push();
          $timeout(function() {
            angular.forEach(events, function(e) {
              self.events.push(e)
            });
            view.calendar.addEventSource(self.events);
          });
        });
      }
    }
  }

  self.getEvent();




}]);
