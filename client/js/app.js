var myApp = angular.module('myApp', ['ngRoute'])
  .config(function($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: '/partials/main.html'
    })
    .when('/dashboard', {
      templateUrl: '/partials/dashboard.html'
    })
  })
