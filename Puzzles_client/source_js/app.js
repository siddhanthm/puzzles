var app = angular.module('puzzles', ['ngRoute', 'puzzleControllers', 'puzzleServices']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
    templateUrl: './partials/home.html',
    controller: 'homeCtrl'
  }).
  when('/portfolio', {
    templateUrl: './partials/portfolio.html',
    controller: 'portfolioCtrl'
<<<<<<< 11e633d9b88b7295eca77c9f0a4cd36ad1103bde
  }).
  when('/home', {
    templateUrl: './partials/portfolio.html',
    controller: 'portfolioCtrl'
  }).
  when('/about', {
    templateUrl: './partials/portfolio.html',
    controller: 'portfolioCtrl'
  }).
  when('/exp', {
    templateUrl: './partials/portfolio.html',
    controller: 'portfolioCtrl'
  }).
  when('/project', {
    templateUrl: './partials/portfolio.html',
    controller: 'portfolioCtrl'
  }).
  otherwise({
=======
  }).when('/home', {
     templateUrl: './partials/portfolio.html',
     controller: 'portfolioCtrl'
   }).
  when('/about', {
     templateUrl: './partials/portfolio.html',
     controller: 'portfolioCtrl'
   }).
   when('/exp', {
     templateUrl: './partials/portfolio.html',
     controller: 'portfolioCtrl'
   }).
   when('/project', {
     templateUrl: './partials/portfolio.html',
     controller: 'portfolioCtrl'
   }).
  when('/add/basic', {
    templateUrl: './partials/adduserbasic.html',
    controller: 'addUserCtrl'
  }).when('/add/education', {
    templateUrl: './partials/addusereducation.html',
    controller: 'addUserCtrl'
  })
  .when('/add/internship', {
    templateUrl: './partials/adduserinternship.html',
    controller: 'addUserCtrl'
  }).when('/add/projects', {
    templateUrl: './partials/adduserprojects.html',
    controller: 'addUserCtrl'
  }).
    otherwise({
>>>>>>> Week 2
    redirectTo: '/'
  });
}]);
