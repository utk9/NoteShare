angular.module('noteShareApp').controller("postNotesCtrl", ['$scope', 'multipartForm', 
	function($scope, multipartForm) {
		
		$scope.newNote = {};
		$scope.errorMsg = null;
		$scope.uploadedInvalidFile = false;
		$scope.fileNames = [];
		var numFiles = 0;

		$scope.hideSuccessMsg();

		
		$('#filesToUpload').on("change", function ()
		{	
			var tempNumFiles = 0;
			for (var i=0; i<this.files.length; i++){
				if (this.files[i].type.indexOf("image")>-1 || this.files[i].type == "application/pdf"){
					console.log("okay");
					$scope.newNote[i] = this.files[i];
				$scope.fileNames[i] = this.files[i].name;
				tempNumFiles++;
				} else {
					$scope.uploadedInvalidFile = true;
					$scope.$apply();
					return;
				}		
			}
			$scope.uploadedInvalidFile = false;
			numFiles = tempNumFiles;
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
			if (!($scope.uploadedInvalidFile)){
				multipartForm.post(uploadURL, $scope.newNote);
			$scope.showSuccessMsg();
			}
			
		}

		


	};



}]);