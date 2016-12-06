myApp.controller("CreateController", ["$http", function($http) {
  var self = this;
  // self.events = [];
  self.newEvent = {};

  getEvent();

  function getEvent() {
    $http.get('/events')
    .then(function(response) {
      self.events = response.data;
    },
    function(response){
      console.log('get error: ', response);
    });
  }


  self.createEvent = function(){
    console.log('create event');
    $http.post('/events', self.newEvent)
      .then(function(response) {
        self.events.push(response.data);
        console.log(response);
      },
      function(response) {
        console.log('post error: ', response);
      });
    }

}]);
