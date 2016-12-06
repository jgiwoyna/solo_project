myApp.controller('CreateController', ['$http', 'EventFactory', function($http, EventFactory) {
  var self = this;
  self.events = EventFactory.events;
  self.newEvent = {};
  self.currentEvent = {};

  getEvent();

  function getEvent() {
    EventFactory.updateEvents().then(function(response) {
      self.events = EventFactory.eventData();
      self.currentEvent = EventFactory.currentEvent();
      console.log("controller got event from the factory: ", self.events);
    },
    function(response){
      console.log('get error: ', response);
    });
  }


  self.createEvent = function(){
    console.log('create event');
    EventFactory.createEvent(self.newEvent)
      .then(function(response) {
        console.log('controller create event response ', response);
        self.events = EventFactory.eventData();
        self.currentEvent = EventFactory.currentEvent();
      },
      function(response) {
        console.log('post error: ', response);
      });
    }

}]);
