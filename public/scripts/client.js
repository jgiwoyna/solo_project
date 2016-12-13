var myApp = angular.module('myApp', ['ngRoute', 'firebase', 'ui.calendar', 'ui.bootstrap.datetimepicker']);

myApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider
  .when('/events', {
    templateUrl: '/views/templates/events.html',
    controller: 'EventsController',
    controllerAs: 'ec'
  })
  .when('/create' ,{
    templateUrl: '/views/templates/create.html',
    controller: 'CreateController',
    controllerAs: 'cc'
  })
  .when('/venues' ,{
    templateUrl: '/views/templates/venues.html',
    controller: 'VenuesController',
    controllerAs: 'vc'
  })
  .otherwise({
    redirectTo: 'EventsController'
  });

}]);
