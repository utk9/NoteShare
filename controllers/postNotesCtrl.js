angular.module('noteShareApp').controller("postNotesCtrl", ['$scope', 'multipartForm', 
	function($scope, multipartForm) {
		
		$scope.newNote = {};
		

			$('#filesToUpload').on("change", function ()
			{	
				$scope.newNote.file = [];
				$scope.temp = this.files.length;
				for (var i=0; i<this.files.length; i++){
					$scope.newNote[i] = this.files[i];
				}
			});	

		console.log("uploading data on front side")
		$scope.uploadData = function(){
			console.log("uploaded");
			$scope.data.notes.push($scope.newNote);
			var uploadURL = '/uploadData';
			multipartForm.post(uploadURL, $scope.newNote);
		};



	}]);