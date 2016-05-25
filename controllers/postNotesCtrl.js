angular.module('noteShareApp').controller("postNotesCtrl", ['$scope', 'multipartForm',
	function($scope, multipartForm) {
		
		$scope.newNote = {};
		$scope.isError = false;
	
		$('#filesToUpload').on("change", function ()
		{	
			$scope.newNote.file = [];
			$scope.temp = this.files.length;
			for (var i=0; i<this.files.length; i++){
				$scope.newNote[i] = this.files[i];
			}
		});	
		$scope.uploadData = function(){
			var uploadURL = '/uploadData';
			console.log($scope.newNote);
			if ($scope.newNote.poster!=undefined && $scope.newNote.date!=undefined && 
				$scope.newNote.date!=undefined && $scope.newNote.course!=undefined){

				multipartForm.post(uploadURL, $scope.newNote);
		} else {
			$scope.isError = true;
		}

	};



}]);