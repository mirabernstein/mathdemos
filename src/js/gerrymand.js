var myApp = angular.module('gerrymandApp', []);

myApp.controller('gerrymandController', ['$scope', function ($scope) {

  /*  Comments describing the application go here */

  var DEFAULT = {

  };

  $scope.appVersion = '0.0.1';

  $scope.districts = {
    'cell':[],
    'val': []
  };

}]);