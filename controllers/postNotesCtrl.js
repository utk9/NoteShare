angular.module('noteShareApp').controller("postNotesCtrl", ['$scope', 'multipartForm', 
	function($scope, multipartForm) {
		$scope.newNote = {};
		$scope.uploadData = function(){
			var uploadURL = '/uploadData';
			multipartForm.post(uploadURL, $scope.newNote);
		};



}]);



