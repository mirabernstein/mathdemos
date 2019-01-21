var myApp = angular.module('gerrymandApp', []);

myApp.controller('gerrymandController', ['$scope', function ($scope) {

  /*  Comments describing the application go here */

  var DEFAULT = {
    districts : { val:{},
      class: {
        c11: 'd1',
        c12: 'd1',
        c13: 'd1',
        c21: 'd2',
        c22: 'd2',
        c23: 'd2',
        c31: 'd3',
        c32: 'd3',
        c33: 'd3',
        c41: 'd4',
        c42: 'd4',
        c43: 'd4',
        c51: 'd5',
        c52: 'd5',
        c53: 'd5',
        c61: 'd6',
        c62: 'd6',
        c63: 'd6'
      }
    }
  };

  $scope.appVersion = '0.0.1';

  $scope.districts = DEFAULT.districts;

}]);