angular.module('noteShareApp').controller("postNotesCtrl", ['$scope', 'multipartForm',
	function($scope, multipartForm) {
		
		$scope.newNote = {};
		$scope.errorMsg = null;
		$scope.fileNames = [];
		var numFiles = 0;

		$scope.hideSuccessMsg();

		
		
		$('#filesToUpload').on("change", function ()
		{	
			for (var i=0; i<this.files.length; i++){
				$scope.newNote[i] = this.files[i];
				$scope.fileNames[i] = this.files[i].name;
			}
			numFiles = this.files.length;
			$scope.$apply();
		});	

		$scope.uploadData = function(){
			var uploadURL = '/uploadData';

			if ($scope.newNote.poster==undefined || $scope.newNote.date==undefined || 
				$scope.newNote.date==undefined || $scope.newNote.course==undefined){
				$scope.errorMsg = "Please fill out all the fields.";
		} else if (numFiles < 1){
			$scope.errorMsg = "Please upload file(s).";
		}
		else {
			multipartForm.post(uploadURL, $scope.newNote);
			$scope.showSuccessMsg();
		}

		


	};



}]);