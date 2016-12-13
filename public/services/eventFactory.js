myApp.factory('EventFactory', ['$firebaseAuth', 'AuthFactory', '$http', function($firebaseAuth, AuthFactory, $http) {
  console.log('events factory running');

  var currentEvent = undefined;
  var events = undefined;


  function getEvent() {

    console.log('factory getting events');
    var promise = $http.get('/events')
    .then(function(response) {
      events = [];
      for (var i = 0; i < response.data.length; i++) {
        response.data[i].start = moment(response.data[i].start).format();
        events.push(response.data[i]);
      }

      return events;
    },
    function(response) {
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
