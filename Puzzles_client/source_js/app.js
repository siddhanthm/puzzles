var app = angular.module('puzzles', ['ngRoute', 'puzzleControllers', 'puzzleServices']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
    templateUrl: './partials/home.html',
    controller: 'homeCtrl'
  }).
  when('/portfolio/:id', {
    templateUrl: './partials/portfolio.html',
    controller: 'portfolioCtrl'
  }).
  when('/signup', {
     templateUrl: './partials/signup.html',
     controller: 'signUpCtrl'
  }).
  when('/login', {
      templateUrl: './partials/login.html',
      controller: 'loginCtrl'
  }).
  when('/add/basic', {
    templateUrl: './partials/adduserbasic.html',
    controller: 'addUserCtrl'
  }).
  when('/add/education', {
    templateUrl: './partials/addusereducation.html',
    controller: 'addUserCtrl'
  }).
  when('/add/internship', {
    templateUrl: './partials/adduserinternship.html',
    controller: 'addUserCtrl'
  }).
  when('/add/projects', {
    templateUrl: './partials/adduserprojects.html',
    controller: 'addUserCtrl'
  }).
  when('/baduser', {
    templateUrl: './partials/baduser.html',
    controller: 'portfolioCtrl'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);
