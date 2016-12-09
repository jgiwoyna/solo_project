myApp.factory('EventFactory', ['$http', function($http) {
  console.log('events factory running');

  var currentEvent = undefined;
  var events = undefined;

  function createEvent(newEvent){
    console.log('create event');
    var promise = $http.post('/events', newEvent)
    .then(function(response) {
      events.push(response.data);
      console.log('factory create event response ', response.data);
      return getEvent();
    },
    function(response) {
      console.log('post error: ', response.data);
    });
    return promise;
  }

  function getEvent() {
    console.log('factory getting event');
    var promise = $http.get('/events')
    .then(function(response) {
      events = [];
      for (var i = 0; i < response.data.length; i++) {
        response.data[i].start = moment(response.data[i].start).format();
        events.push(response.data[i]);
      }

      return events;
    },
    function(response){
      console.log('get error: ', response);
    });
    return promise;
  }




  var publicApi = {

    currentEvent: function() {

      return currentEvent;
    },
    eventData: function() {

      return events;
    },
    updateEvents: function() {

      return getEvent();
    },
    createEvent: function(newEvent) {

      return createEvent(newEvent);
    }
  };

  return publicApi;

}]);
