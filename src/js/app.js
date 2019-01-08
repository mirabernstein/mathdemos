var myApp = angular.module('myApp', []);

myApp.controller('mathdemoController', ['$scope', function($scope) {
  $scope.firstnumber = 7;
  $scope.secondnumber = 12;
  $scope.answer = "???";

}]);