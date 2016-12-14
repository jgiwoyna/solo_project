myApp.controller('CreateController', ['$firebaseAuth', '$http', 'AuthFactory', 'EventFactory', function($firebaseAuth, $http, AuthFactory, EventFactory) {

  console.log('create controller is here!');

  var auth = $firebaseAuth();

  var self = this;

  self.newEvent = {};
  self.currentEvent = {};
  self.currentUser = AuthFactory.getCurrentUser();

  getEvent();

  function getEvent() {

      EventFactory.updateEvents().then(function(response) {

        self.events = EventFactory.eventData();
        self.currentEvent = EventFactory.currentEvent();
        console.log('controller got events from the factory: ', self.events);

      });

  }


  self.logIn = AuthFactory.logIn;
  self.logOut = AuthFactory.logOut;


  self.createEvent = function() {

    console.log('create event');
    console.log(AuthFactory.getCurrentUser());

    if(AuthFactory.getCurrentUser() != null) {

      AuthFactory.getCurrentUser().getToken().then(function(idToken) {

        var promise = $http({
          method: 'POST',
          url: '/create-form',
          headers: {
            id_token: idToken
          },
          data: self.newEvent

        }).then(function(response) {
          getEvent();
          console.log('factory create event response ', response.data);
          self.newEvent = {};
          alert('Your event has been added!');
          return getEvent();
        },

        function(response) {
          console.log('post error: ', response.data);
        });

        return promise;

      });

    } else {
      alert('You must be logged into to create event!');
    }

  }


}]);
