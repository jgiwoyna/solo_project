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


  auth.$onAuthStateChanged(function(firebaseUser){

    currentUser = firebaseUser;
    if(firebaseUser) {
      
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
