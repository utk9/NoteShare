angular.module('noteShareApp').controller("allNotesCtrl", ['$scope', 
	function($scope) {

		$scope.clearSearch = function(){
			console.log("clear clicked");
			$scope.searchQuery = "";
		}

		$scope.setQuery = function(query){
			$scope.searchQuery = query;
		}





	}]);