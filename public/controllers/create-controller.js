myApp.controller('CreateController', ['$http', 'EventFactory', function($http, EventFactory) {
  console.log('create controller is here!');
  var self = this;
  self.newEvent = {};
  self.currentEvent = {};

  getEvent();

  function getEvent() {
    if(EventFactory.eventData() === undefined) {

      EventFactory.updateEvents().then(function(response) {
        self.events = EventFactory.eventData();
        self.currentEvent = EventFactory.currentEvent();
        console.log("controller got event from the factory: ", self.events);
      });
    } else {
      self.events = EventFactory.eventData();
      self.currentEvent = EventFactory.currentEvent();
    }
  }


  self.createEvent = function(){
    console.log('create event');
    EventFactory.createEvent(self.newEvent)
    .then(function(response) {
      console.log('controller create event response ', response);
      self.events = EventFactory.eventData();
      self.currentEvent = EventFactory.currentEvent();
      self.newEvent = {};
      alert("Your event has been added!");
    },
    function(response) {
      console.log('post error: ', response);
    });
  }

}]);
