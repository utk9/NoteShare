angular.module('noteShareApp').controller("noteShareCtrl", ['$scope', function($scope) {
  $scope.data = {
		notes: [
		{poster: "John", date: "11/11/11", course:"ece106", topic:"capacitors", filePaths:[]},
		{poster: "Bobert", data:"12/12/12", course:"ece124", topic:"memory",filePaths:[]}

		]
	}
}]);