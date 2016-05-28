angular.module('noteShareApp').controller("allNotesCtrl", ['$scope', '$http',
	function($scope, $http) {

		$scope.baseURL = "http://localhost:8888";

		$scope.hideSuccessMsg();


		$scope.clearSearch = function(){
			console.log("clear clicked");
			$scope.searchQuery = "";
		}

		$scope.setQuery = function(query){
			$scope.searchQuery = query;
		}

		$scope.refreshData = function(){
			$http.get($scope.dataURL).success(function(data){
				$scope.data.notes = data;
				console.log($scope.data);
			}).error(function(err){
				$scope.data.error = err;
			});

		}

		$scope.refreshData();





	}]);