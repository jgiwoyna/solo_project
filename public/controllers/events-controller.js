myApp.controller("EventsController", ["$http", function($http) {
  var self = this;
  self.events = [];
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
