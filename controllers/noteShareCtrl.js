angular.module('noteShareApp').controller("noteShareCtrl", ['$scope', '$http', function($scope, $http) {
  
	var dataURL = 'allNotes';
  	$scope.data = {}

	$http.get(dataURL).success(function(data){
		$scope.data.notes = data;
	}).error(function(err){
		$scope.data.error = err;
	});

}]);
