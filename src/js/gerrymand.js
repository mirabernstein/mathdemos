var myApp = angular.module('gerrymandApp', []);

myApp.controller('gerrymandController', ['$scope', function ($scope) {

  /*  Comments describing the application go here */

  $scope.appVersion = '0.0.2';

  $scope.districts = {
    val: {},
    class: {}
  };

  // Create a array of array of numbers (2D array)
  // Uses the array map function, and the arrow notation
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  // Arrow notation replaces `function(x){ return x+1; }` with `x => x+1`
  // And `function(x){ var y = x+3; return y;}` with x => { var y = x+3; return y;}
  // It's a lot more compact and may be more natural for mathematicians
  const make2DArray = function (r, c, fn) {
    var matrix = new Array(r).fill(null).map(() => new Array(c).fill(null));
    return matrix.map((rows, rowindex) => rows.map((cell, cellindex) => fn(rowindex, cellindex)));
  };

  // Generate a random integer from a range between 0 and max
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  const getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max + 1));
  };

  // Curry this to make a new function for a given max
  // https://blog.benestudio.co/currying-in-javascript-es6-540d2ad09400
  const curryedGetRandomInt = (n) => (() => getRandomInt(n));

  // This is a function that generates either 0 or 1
  const getRandomInt1 = curryedGetRandomInt(1);
  const getRandomInt6 = curryedGetRandomInt(5);
  const getRandomDistrict6 = () => 'd' + getRandomInt6();


  const initializeVars = function () {
    // https://stackoverflow.com/a/43222059/628748
    // Initialize a 6*3 matrix with values 0 or 1 
    var distValues = make2DArray(6, 3, getRandomInt1);
    var classValues = make2DArray(6, 3, getRandomDistrict6);

    // Initialize a 6*3 matrix with string values 'c00', 'c01', 'c03', 'c10'... 
    const setValName = (rowindex, cellindex) => 'v' + rowindex + cellindex;
    const setClassName = (rowindex, cellindex) => 'c' + rowindex + cellindex;

    const valNames = make2DArray(6, 3, setValName);
    const classNames = make2DArray(6, 3, setClassName);

    // This map function does not change valNames, but rather sets the $scope.districts.val values
    // valname[1] is the string value of the row; parseInt converts that to a base 10 integer 
    valNames.map(rows => rows.map(valname => {
      $scope.districts.val[valname] = distValues[parseInt(valname[1], 10)][parseInt(valname[2], 10)];
    }));

    classNames.map(rows => rows.map(classname => {
      $scope.districts.class[classname] = classValues[parseInt(classname[1], 10)][parseInt(classname[2], 10)];
    }));
  };

  initializeVars();

}]);