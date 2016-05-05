'use strict';

angular.module('myWishListApp.welcome', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/welcome', {
    templateUrl: 'welcome/welcome.html',
    controller: 'WelcomeCtrl'
  });
}])

  
.controller('WelcomeCtrl', ['$scope', '$location', '$firebaseAuth', '$firebaseArray', function($scope, $location, $firebaseAuth, $firebaseArray, Auth, $state) {
    var firebaseObj = new Firebase("https://mywishlistlg.firebaseio.com/");
    var presenceRef = new Firebase('https://mywishlistlg.firebaseio.com/disconnectmessage');
    var connectedRef = new Firebase("https://mywishlistlg.firebaseio.com/.info/connected");
    var loginObj = $firebaseAuth(firebaseObj);
    var authData = firebaseObj.getAuth(); 
    console.log("Authenticated user with uid: WELCOME", authData, authData.password.email, authData.uid);
    $scope.listName = "Welcome: " + authData.password.email;
    var whatUser = authData.password.email;
    var whatUserToDos;
    var userRef = new Firebase("https://mywishlistlg.firebaseio.com/theUsers");
    var filteredEmail = userRef.orderByChild("email").equalTo(authData.password.email);

    // Write a string when this client loses connection
    presenceRef.onDisconnect().set("I disconnected!");
    connectedRef.on("value", function(snap) {
      if (snap.val() === true) {
        console.log("connected");
      } else {
        console.log("not connected");
        $location.path('/home');
      }
    });

    setUser();

    function setUser(){
      $scope.emails = $firebaseArray(filteredEmail);
      var whatKey = $firebaseArray(filteredEmail);
      localStorage.setItem("user", filteredEmail);
    }

    $scope.logMeOut = function(){
      logoutUser();
    }

    function logoutUser(){
        loginObj.$unauth();
        console.log('done logout');
    }


    $scope.getLists = function(id){
      console.log(id)
      var myLists = new Firebase('https://mywishlistlg.firebaseio.com/theUsers/'+id+"/yourCategories/")
      $scope.lists = $firebaseArray(myLists); 
    }

    $scope.grabList = function(value){
      whichList=value;
      localStorage.setItem("selectedList", whichList);
      console.log(localStorage.getItem('selectedList'))
      if(localStorage){
        if(whichList=="noCategories"){
          $location.path('/selectCat');
        }else{
          console.log("grabList"+whichList)
          $location.path('/fullList');
        }
      }else{
        $location.path('/welcome');
      }
    }

    userRef.on("child_added", function(snapshot){
      var newCategory=snapshot.val();
      console.log("Author: " + newCategory.email);
    });

  $scope.gotSelectCat = function(){
      $location.path('/selectCat')
    }

  $scope.showMyLists = function(){
      $location.path('/welcome')
    }

  $scope.showMenu = function(){
    document.getElementById("myMenu").style.display = "none";
    document.getElementById("myMenuClose").style.display = "block"; 
    document.getElementById("slideOutMenu").style.opacity = "1";
    document.getElementById("slideOutMenu").style.visibility = "visible";
  }

  $scope.closeMenu = function(){
    document.getElementById("myMenu").style.display = "block";
    document.getElementById("myMenuClose").style.display = "none";
    document.getElementById("slideOutMenu").style.opacity = "0";
    document.getElementById("slideOutMenu").addEventListener("transitionend", updateTransition);
  }

  function updateTransition(){
      document.getElementById("slideOutMenu").style.visibility = "hidden";
      document.getElementById("slideOutMenu").removeEventListener("transitionend", updateTransition);
  }

}])

