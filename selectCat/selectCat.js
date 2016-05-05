'use strict';
var myCats;

angular.module('myWishListApp.selectCat', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider, $rootScope) {
  $routeProvider.when('/selectCat', {
    templateUrl: 'selectCat/selectCat.html',
    controller: 'selectCatCtrl'
  });
}])


.controller('selectCatCtrl', ['$scope','$location','$firebaseArray', '$firebaseObject', function($scope, $location, $firebaseArray , $firebaseObject) {
	console.log('selectCategoryScreen');
	var messageListRef = new Firebase('https://mywishlistlg.firebaseio.com/');
	var catLengthArray = document.getElementById("categoryChoicesScreen").children;
	var authData = messageListRef.getAuth();
	var yourCategories = ['noCategories'];
    console.log("Authenticated user with uid: WELCOME", authData, authData.password.email, authData.uid);
    $scope.listName = "Welcome: " + authData.password.email;
	var chosen=true;
	$scope.cat0="Apparel";
	$scope.cat1="Home";
	$scope.cat2="Books";
	$scope.cat3="Pet";
	$scope.cat4="Sports";
	$scope.cat5="Accessories";
	$scope.cat6="Groceries";
	$scope.cat7="Music";
	$scope.button_clicked = true;
	check();

	function check(){
		if(listCreated==true){
			document.getElementById("addItemsScreen").style.display = "block";
			document.getElementById("addCat").style.display = "none";
			document.getElementById("categoryChoicesScreen").style.display = "none";
			$scope.category=whichList;
			console.log(listCreated);
		}else{
			document.getElementById("addItemsScreen").style.display = "none";
			document.getElementById("addCat").style.display = "block";
			document.getElementById("categoryChoicesScreen").style.display = "block";
			$scope.category=whichList;	
		}
	}

	$scope.AddPost = function(current_Selection){
		if(listCreated==true){
			var categoryListRef = new Firebase('https://mywishlistlg.firebaseio.com/theUsers/'+whichList+"/Articles/");
		}else{
			var categoryListRef = new Firebase('https://mywishlistlg.firebaseio.com/theUsers/'+current_Selection+"/Articles/");
			whichList=current_Selection
		}
		var categoryDestination = $scope.category;
		var categoryPost = $firebaseArray(categoryListRef);
		var details = $scope.myPosts.details;
		var title = $scope.myPosts.details;
	    var link = $scope.myPosts.link;
	    var note = $scope.myPosts.note;
	    var price = $scope.myPosts.price;
	    var email = authData.password.email;

		categoryListRef.push({category:categoryDestination, title:title, details:details,link:link, note:note, price:price, email:email}, function(error){
			if(error){
				console.log("Error:", error);
			}else{
				console.log("loading");
			}
		})
		$location.path('/fullList');
    };

    var userRef = new Firebase("https://mywishlistlg.firebaseio.com/theUsers");
    var filteredEmail = userRef.orderByChild("email").equalTo(authData.password.email);
   	$scope.emails = $firebaseArray(filteredEmail);
   	var whatKey=  $firebaseArray(filteredEmail);

	for(var i = 0; i < catLengthArray.length; i++){
			catLengthArray[i].id="myChoice"+i;
		};


    $scope.AddCategory = function(current_Selection, id) {
    	console.log(id)
		var catRef = new Firebase('https://mywishlistlg.firebaseio.com/theUsers/'+id+"/")
		var list = $firebaseArray(catRef);
		var catList = new Firebase('https://mywishlistlg.firebaseio.com/theUsers/'+id+"/yourCategories")
		var addCategory = current_Selection;
		var email = authData.password.email;

		catRef.child("yourCategories").on("value", function(snapshot){
		    //console.log(snapshot.val());
		    myCats=snapshot.val();
		})

		/*NEW CODE for adding category to current user*/
		if(myCats[0]=="noCategories"){
		    myCats=[current_Selection]
		}else{
			console.log(myCats);
			if (myCats.indexOf(current_Selection) > -1) {
        		alert("category already exists")
      			$location.path('/welcome')
    		}else{
    			myCats.push(current_Selection);
    		}
		}			
		catList.set(myCats);   
		listCreated=true;
		$scope.button_clicked = true;
		var category = $scope.category;
		document.getElementById("addItemsScreen").style.display = "block";
		document.getElementById("addCat").style.display = "none";
		document.getElementById("categoryChoicesScreen").style.display = "none";
		return false;
    };
	
	$scope.mySelection = function(id) {
		console.log("myChoice"+id)
		var selected=document.getElementsByClassName("chosenCat")
		for(var k= 0; k<selected.length; k++){
			selected[k].className="cat";
		}
		switch(id) {
			    case 0:
			    	myChoice0.className="chosenCat";
			    	$scope.current_Selection=$scope.cat0;
			    	$scope.category=$scope.cat0;
			    	whichList="Apparel";
			        break;
			    case 1:
			    	myChoice1.className="chosenCat";
			    	$scope.current_Selection=$scope.cat1;
			    	$scope.category=$scope.cat1;
			    	whichList="Home";
					break;
			    case 2:
			    	myChoice2.className="chosenCat";
			    	$scope.current_Selection=$scope.cat2;
			    	$scope.category=$scope.cat2;
			    	whichList="Books";
			        break;
			    case 3:
			    	myChoice3.className="chosenCat";
			    	$scope.current_Selection=$scope.cat3;
			    	$scope.category=$scope.cat3;
			    	whichList="Pet";
			        break;
			    case 4:
			    	myChoice4.className="chosenCat";
			    	$scope.current_Selection=$scope.cat4;
			    	$scope.category=$scope.cat4;
			    	whichList="Sports";
					break;
			    case 5:
			    	myChoice5.className="chosenCat";
			    	$scope.current_Selection=$scope.cat5;
			    	$scope.category=$scope.cat5;
			    	whichList="Accessories";
			        break;
			    case 6:
			    	myChoice6.className="chosenCat";
			    	$scope.current_Selection=$scope.cat6;
			    	$scope.category=$scope.cat6;
			    	whichList="Games";
			        break;
			   	case 7:
			    	myChoice7.className="chosenCat";
			    	$scope.current_Selection=$scope.cat6;
			    	$scope.category=$scope.cat7;
			    	whichList="Music";
			        break;
			}
			$scope.button_clicked = false;
	}

    $scope.gotSelectCat = function(){
      $location.path('/selectCat')
    }

  	$scope.showMyLists = function(){
  	  listCreated=false;
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

}]);

