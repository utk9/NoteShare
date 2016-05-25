angular.module('noteShareApp').controller("noteShareCtrl", ['$scope', '$http', '$location', function($scope, $http, $location) {
  
	$scope.dataURL = 'allNotes';
  	$scope.data = {};

    $scope.clearSearch = function(){
      $scope.searchQuery = "";
    }

  	$scope.goPostNotes = function(){
  		$location.path('/postNotes');
  	}

  	$scope.goAllNotes = function(){
  		$location.path('/allNotes');
  		console.log($scope.searchQuery);
  	}

	$http.get($scope.dataURL).success(function(data){
		$scope.data.notes = data;
	}).error(function(err){
		$scope.data.error = err;
	});

}]);
