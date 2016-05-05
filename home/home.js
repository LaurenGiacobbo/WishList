'use strict';

var app = angular.module('myWishListApp.home', ['ngRoute','firebase'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])


app.controller('HomeCtrl', ['$scope', '$location','$firebaseAuth', function($scope, $location, $firebaseAuth) {
	var firebaseObj = new Firebase("https://mywishlistlg.firebaseio.com");
    var loginObj = $firebaseAuth(firebaseObj);
    //$scope.user = {};
  	//var login={};

	//$scope.login=login;
	  $scope.SignIn = function(userData) {
	    var username = $scope.user.email;
	    var password = $scope.user.password;
	    loginObj.$authWithPassword({
            email: username,
            password: password
        }).then(function(user) {
            //Success callback
        	var authData = firebaseObj.getAuth();        	  
		if (authData) {
		  console.log("Authenticated user with uid:", authData, authData.password.email);
		}
			$location.path('/welcome');
			
		}, function(error) {
            //Failure callback
            console.log('Authentication failure');
        });
	}
}])

