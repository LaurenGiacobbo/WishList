(function(angular, undefined) {
  "use strict";
  var am = angular.module('virtual-fitting', ['firebase']);
  am.constant('FirebaseUrl', 'https://virtual-fitting-app.firebaseio.com/');
  // Beginning
  am.controller('AuthCtrl', function(Auth, Users) {
    var self = this;
    self.user = {
      email: '',
      password: '',
      name: ''
    };
    self.register = function() {
      
      console.log('reg')
;      Auth.$createUser(self.user).then(function(user) {
        Auth.$authWithPassword(self.user)
          .then(function(authData) {
            Users.save({
              uid: authData.uid,
              name: self.user.name
            });
          })
          .catch(function(error) {
          
          });
      }, function(error) {
        self.error = error;
      });
      
    };
  });
  // End
})(angular);

(function(angular) {
  
  var am = angular.module('virtual-fitting');
  am.service('Users', UserService);
  
  function UserService(FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl);
    this.save = function(user) {
      ref.child('users').child(user.uid).set(user);
    };
  }
  
}(angular));

(function(angular, undefined) {
  "use strict";
  var am = angular.module('virtual-fitting');
  // Beginning
  am.factory('Auth', function($firebaseAuth, FirebaseUrl){
    var ref = new Firebase(FirebaseUrl);
    var auth = $firebaseAuth(ref);
    return auth;
  });
  // End
})(angular);