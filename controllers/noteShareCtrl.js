angular.module('noteShareApp').controller("noteShareCtrl", ['$scope', '$http', '$location', function($scope, $http, $location) {
  
	$scope.dataURL = 'allNotes';
  	$scope.data = {};

    $scope.uploadSuccessful = false;

    $scope.showSuccessMsg = function(){
      $scope.uploadSuccessful = true;
    }

    $scope.hideSuccessMsg = function(){
      $scope.uploadSuccessful = false;
    }

    $scope.clearSearch = function(){
      $scope.searchQuery = "";
    }

  	$scope.goPostNotes = function(){
  		$location.path('/postNotes');
  	}

  	$scope.goAllNotes = function(){
  		$location.path('/allNotes');
      console.log($scope.uploadSuccessful);
  	}




	$http.get($scope.dataURL).success(function(data){
		$scope.data.notes = data;
	}).error(function(err){
		$scope.data.error = err;
	});

}]);
