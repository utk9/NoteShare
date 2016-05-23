angular.module('noteShareApp').controller("noteShareCtrl", ['$scope', '$http', function($scope, $http) {
  
	$scope.dataURL = 'allNotes';
  	$scope.data = {}

	$http.get($scope.dataURL).success(function(data){
		$scope.data.notes = data;
	}).error(function(err){
		$scope.data.error = err;
	});

}]);
