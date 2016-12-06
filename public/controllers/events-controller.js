myApp.controller('EventsController', ['$http', 'EventFactory', function($http, EventFactory) {
  var self = this;
  self.events = EventFactory.events;
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
