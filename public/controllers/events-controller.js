myApp.controller('EventsController', ['$http', '$compile', 'AuthFactory', 'EventFactory', function($http, $compile, AuthFactory, EventFactory) {

  var self = this;

  console.log('events controller is now here!');

  self.events = [[]];

  self.getEvent = function() {

    if(EventFactory.eventData() === undefined) {

      EventFactory.updateEvents().then(function(response) {
        for (var i = 0; i < response.length; i++) {
          response[i].start = moment(response[i].start).format();
          self.events[0].push(response[i]);
        }
        self.currentEvent = EventFactory.currentEvent();
        console.log('controller got events from the factory: ', self.events);
      });

    } else {
      self.events = [EventFactory.eventData()];
      self.currentEvent = EventFactory.currentEvent();
    }

  }

  self.createEvent = function() {

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

  self.eventRender = function(events, element, view) {

    element.append("<p>" + events.venue + "<br>" + events.cover + "</p>");
    $compile(element)(self);

  };

  self.uiConfig = {

    calendar: {
      height: 1400,
      editable: false,
      header: {
        left: 'month basicWeek basicDay',
        center: 'title',
        right: 'today prev,next'
      },
      eventClick: self.alertEventOnClick,
      eventDrop: self.alertOnDrop,
      eventResize: self.alertOnResize,
      eventRender: self.eventRender
    }

  }

  self.getEvent();


}]);
