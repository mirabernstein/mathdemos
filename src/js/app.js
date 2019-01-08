var myApp = angular.module('myApp', []);

myApp.controller('mathdemoController', ['$scope', function ($scope) {

  /* $scope.problems is an object that contains named problems. 
     Each named problem is an object that has a name, and a js function that calculates a correct answer and returns a message.
     The problem object (e.g. 'addition' and 'multiplication' below could be made into a Class. 
     */

  var defaultProblemName = 'addition';

  $scope.setCurrentProblem = function (problemName) {
    $scope.currentProblem = $scope.mathDemos.getProblem(problemName);
  };

  var clearAll = function () {
    $scope.setCurrentProblem(defaultProblemName);
    $scope.userResponse = '';
    $scope.feedback = "Enter your answer and click 'Submit'";
  };

  var getUserError = function (answer, userResponse) {
    return Math.abs(answer - userResponse);
  };
  var addition = {
    'name': 'addition',
    'probDisplay': function (a, b) {
      return a.toString() + " + " + b.toString();
    },
    'mainfunction': function (a, b, userResponse) {
      var probFun = function (a, b) {
        return a + b;
      };
      var answer = probFun(a, b);
      var userError = getUserError(answer, userResponse);
      var msg = '';
      switch (userError) {
        case userError === 0:
          msg = 'Great job!';
          break;
        case userError / answer <= 0.10:
          msg = 'Close, try again!';
          break;
        case userError / answer > 0.10:
          msg = 'Way off! Try again!';
      }
      var respObject = {
        'answer': answer,
        'message': msg
      };
      return respObject;
    }
  };

  var multiplication = {
    'name': 'multiplication',
    'probDisplay': function (a, b) {
      return a.toString() + " * " + b.toString();
    },
    'mainfunction': function (a, b, userResponse) {
      var probFun = function (a, b) {
        return a * b;
      };
      var answer = probFun(a, b);
      switch (userResponse) {
        case userResponse === answer:
          msg = 'Correct!!';
          break;
        case ((userResponse % a) * (userResponse % b) === 0):
          msg = 'At least your answer is a multiple of one of the numbers. Try again.';
          break;
        default:
          msg = 'Your answer is not even divisible by one of the numbers. Try again.';
      }
      var respObject = {
        'answer': answer,
        'message': msg,
      };
      return respObject;
    }
  };

  $scope.mathDemos = {
    'defaults': {
      'a': 7,
      'b': 20
    },
    'getProblem': function(problemName){
      return this.problems[problemName];
    },
    'problems': {'addition': addition, 'multiplication': multiplication}
  };

  $scope.display = {

  };

  // Initiate application variables
  clearAll();


}]);