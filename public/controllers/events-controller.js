myApp.controller('EventsController', ['$http', '$compile', 'EventFactory', function($http, $compile, EventFactory) {
  var self = this;
  self.events = [];

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
       }
      //  eventClick: self.alertEventOnClick,
      //  eventDrop: self.alertOnDrop,
      //  eventResize: self.alertOnResize
     }
   };


}]);
