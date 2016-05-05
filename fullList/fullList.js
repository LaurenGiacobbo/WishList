'use strict';

angular.module('myWishListApp.fullList', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/fullList', {
    templateUrl: 'fullList/fullList.html',
    controller: 'fullListCtrl'
  });
}])

.controller('fullListCtrl', function($scope, $location, $rootScope, $firebaseArray, $firebaseObject) {
    var messagesRef = new Firebase("https://mywishlistlg.firebaseio.com/");
    var userRef = new Firebase("https://mywishlistlg.firebaseio.com/theUsers/");
    var authData = messagesRef.getAuth(); 
    var post;
    var myPostArray;
    var ref;
    $scope.listName = authData.password.email;
    $scope.category=whichList;
    runList(whichList);
    console.log("Authenticated user with uid: WELCOME", authData, authData.password.email, authData.uid);

    presenceRef.onDisconnect().set("I disconnected!");
    connectedRef.on("value", function(snap) {
      if (snap.val() === true) {
        console.log("connected");
      } else {
        console.log("not connected");
        $location.path('/home');
      }
    });
  
    function runList(whichList){
      console.log("running list")
      var whichList = localStorage.getItem('selectedList');
      if(localStorage){
        if (localStorage.getItem('selectedList')) {
          // Restore the contents of the text field
          $scope.category = localStorage.getItem('selectedList');
          var whichList = localStorage.getItem('selectedList');
          var ref = new Firebase("https://mywishlistlg.firebaseio.com/theUsers/"+whichList+"/Articles/");
          console.log("getItem"+localStorage.getItem("selectedList")+ref)
          var query = ref.orderByChild("email").equalTo(authData.password.email);
          $scope.articles = $firebaseArray(query);
        }else{
          console.log('runList no local storage')
          listCreated=true;
          $scope.category = whichList;
          var ref = new Firebase("https://mywishlistlg.firebaseio.com/"+whichList+"/Articles/");
          ref.orderByChild("email").equalTo(authData.password.email).on("child_added", function(snapshot) {
            post = snapshot.val();
            console.log("myDetails are" + post.email)
            console.log(typeof post)
          });  
          filterList(whichList);
        };   
      }else{
        $location.path('/welcome');
      }  
    };
    
    function filterList(whichList){   
      console.log("filteringList"+ref)
      var query = ref.orderByChild("email").equalTo(authData.password.email);
      $scope.articles = $firebaseArray(query);
    }
      
    $scope.removeArticle = function(id){
      ref = new Firebase("https://mywishlistlg.firebaseio.com/theUsers/"+whichList+"/Articles/"+id);
      var deleteThis = $firebaseObject(ref);
      var item = deleteThis[id]
      console.log(id);
      deleteThis.$remove(id).then(function(newRef) {
      console.log("removed" + id);
      });
    }

    $scope.showArticle = function(id,details,category){
      console.log(id+details+category)
      ref = new Firebase("https://mywishlistlg.firebaseio.com/theUsers/"+category+"/Articles/"+id);
      var showThis = $firebaseObject(ref);
      $scope.data=showThis;
      document.getElementById('detailItemsScreen').style.display="block";
      document.getElementById('fullListScreen').style.display="none";
    }

    $scope.backToList = function(){
      document.getElementById('detailItemsScreen').style.display="none";
      document.getElementById('fullListScreen').style.display="block"; 
    }

    $scope.newItem = function(){
      console.log(whichList)
      $location.path('/selectCat');
    }

    $scope.gotSelectCat = function(){
      console.log(whichList)
      listCreated=false;
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

    /*$scope.editPost = function(id) {
      var myID = new Firebase("https://mywishlistlg.firebaseio.com/Articles/"+id);
      //var obj = $firebaseObject(ref);
      //$('#editModal').modal();
    }*/

    /*$scope.update = function() {
        console.log($scope.postToUpdate.$id);
        var fb = new Firebase("https://blistering-heat-2473.firebaseio.com/Articles/" + $scope.postToUpdate.$id);
        var article = $firebase(fb);
        article.$update({
            title: $scope.postToUpdate.title,
            post: $scope.postToUpdate.post,
            emailId: $scope.postToUpdate.emailId
        }).then(function(ref) {
            console.log(ref.key()); // bar
            $('#editModal').modal('hide')
        }, function(error) {
            console.log("Error:", error);
        });
    }*/

});

