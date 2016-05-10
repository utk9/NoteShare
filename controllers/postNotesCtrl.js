angular.module('noteShareApp').controller("postNotesCtrl", ['$scope', 'multipartForm', 
	function($scope, multipartForm) {
		
		$scope.newNote = {};
		$scope.temp = "herroo";

			$('#filesToUpload').change(function ()
			{	
				$scope.newNote.file = [];
				//$scope.newNote.file = this.files[0];
				$scope.temp = this.files.length;
				for (var i=0; i<this.files.length; i++){
					//$scope.newNote.file.push(this.files[i]);
					$scope.newNote[i] = this.files[i];
				}
			});


		

		
		

		console.log("uploading data on front side")
		$scope.uploadData = function(){
			//console.log($scope.newNote.file.length);
			console.log(Array.isArray($scope.newNote.file));
			var uploadURL = '/uploadData';
			multipartForm.post(uploadURL, $scope.newNote);
		};



	}]);