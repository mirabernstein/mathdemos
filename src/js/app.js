var myApp = angular.module('myApp', []);

myApp.controller('mathdemoController', ['$scope', function ($scope) {

  /* $scope.problems is an object that contains named problems. 
     Each named problem is an object that has a name, and a js function that calculates a correct answer and returns a message.
     The problem object (e.g. 'addition' and 'multiplication' below could be made into a Class. 
     */

  var DEFAULT = {
    'variables': {
      'a': 21,
      'b': 7
    },
    'problemName': 'addition',
    'answer': null,
    'message': '',
    'pageTitle': 'Math Demos',
    'instructions': 'Select type of problem, enter an answer and click "Submit"'
  };

  $scope.appVersion = '1.0.0';

  $scope.current = {};

  $scope.setCurrentProblem = function (problemName) {
    clearAll();
    $scope.current.problem = $scope.mathDemos.getProblem(problemName);
  };

  $scope.setCurrentVariables = function (variables) {
    $scope.current.variables = variables;
  };

  $scope.setCurrentMessage = function (message) {
    $scope.current.message = message;
  };

  $scope.setCurrentAnswer = function (answer) {
    $scope.current.answer = answer;
  };

  var clearAll = function () {
    $scope.userResponse = '';
    $scope.setCurrentVariables(DEFAULT.variables);
    $scope.setCurrentMessage(DEFAULT.message);
    $scope.setCurrentAnswer(DEFAULT.answer);
    $scope.instructions = {
      'show': true,
      'text': DEFAULT.instructions
    };
  };

  var getUserError = function (answer, userResponseFloat) {
    return Math.abs(answer - userResponseFloat);
  };
  var addition = {
    'name': 'addition',
    'problemDisplay': function (variables) {
      return "What do you get when you add " + variables.a.toString() + " and " + variables.b.toString() + "?";
    },
    'mainFunction': function (variables, userResponse) {
      var problemFunction = function (a, b) {
        return a + b;
      };
      var answer = problemFunction(variables.a, variables.b);
      var userError = getUserError(answer, parseFloat(userResponse));
      var msg = '';
      if (userError === 0) {
        msg = 'Great job!';
      } else if (userError / answer <= 0.10) {
        msg = 'Close, try again!';
      } else if (userError / answer > 0.10) {
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
    'problemDisplay': function (variables) {
      return "What is " + variables.a.toString() + " * " + variables.b.toString() + "?";
    },
    'mainFunction': function (variables, userResponse) {
      var problemFunction = function (a, b) {
        return a * b;
      };
      var answer = problemFunction(variables.a, variables.b);
      var msg = '';
      if (parseFloat(userResponse) === answer) {
        msg = 'Correct!!';
      } else if ((parseFloat(userResponse) % variables.a) * (parseFloat(userResponse) % variables.b) === 0) {
        msg = 'At least your answer is a multiple of one of the numbers. Try again.';
      } else {
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
    'display': {
      'pageTitle': DEFAULT.pageTitle
    },
    'getProblem': function (problemName) {
      return this.problems[problemName];
    },
    'problems': {
      'addition': addition,
      'multiplication': multiplication
    },
    'submitAnswer': function () {
      var problemResult = $scope.current.problem.mainFunction($scope.current.variables, $scope.userResponse);
      $scope.setCurrentAnswer(problemResult.answer);
      $scope.setCurrentMessage(problemResult.message);
    }
  };


  // Initiate application variables
  $scope.setCurrentProblem(DEFAULT.problemName);

}]);