myApp.factory('AuthFactory', ['$firebaseAuth', '$http', function($firebaseAuth, $http) {
  console.log('auth factory is running');
  var auth = $firebaseAuth();
  var currentUser = null;



  function logIn(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      currentUser = firebaseUser;
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
      return currentUser;
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

  // This code runs whenever the user changes authentication states
  // e.g. whevenever the user logs in or logs out
  // this is where we put most of our logic so that we don't duplicate
  // the same things in the login and the logout code
  auth.$onAuthStateChanged(function(firebaseUser){
    // firebaseUser will be null if not logged in
    currentUser = firebaseUser;
    if(firebaseUser) {
      // This is where we make our call to our server
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/events',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          console.log(response.data);
          response = response.data;
        });
      });
    } else {
      console.log('Not logged in or not authorized.');
    }

  });

  function getCurrentUser() {
    return currentUser;
  }

  function logOut(){
    auth.$signOut().then(function(){
      console.log('Logging the user out!');
    });
  };

  var publicApi = {
    logIn: function() {
      return logIn();
    },
    logOut: function() {
      return logOut();
    },
    getCurrentUser: function() {
      return getCurrentUser();
    }
  };

  return publicApi;

  }]);
