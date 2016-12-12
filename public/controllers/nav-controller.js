myApp.controller('NavController', ['$http', '$compile', 'AuthFactory', 'EventFactory', function($http, $compile, AuthFactory, EventFactory) {
  console.log('nav controller is cool');
  var self = this;

  self.getEvent = EventFactory.getEvent;

}]);
