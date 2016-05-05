
'use strict';
var listCreated;
var whichList;
// Declare app level module which depends on views, and components
angular.module('myWishListApp', [
  'ngRoute',
  'myWishListApp.home',
  'myWishListApp.selectCat',
  'myWishListApp.fullList',
  'myWishListApp.register',
  'myWishListApp.welcome',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);