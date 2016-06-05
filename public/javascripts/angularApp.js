var app = angular.module('noteShareApp',["ui.router"]);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/views/mainPageView.ejs',
			controller: 'mainPageCtrl'
		})
		.state('allNotes', {
			url: '/allNotes',
			templateUrl: '/views/allNotesView.ejs',
			controller: 'allNotesCtrl'
		})
		.state('postNotes', {
			url: '/postNotes',
			templateUrl: '/views/postNotesView.ejs',
			controller: 'postNotesCtrl'
		});

		$urlRouterProvider.otherwise('/');
	}]);

app.directive('datepicker', function ($parse) {
	return function(scope, element, attrs, controller){
		var ngModel = $parse(attrs.ngModel);
		$(function(){
			element.datepicker({
				onSelect: function(dateText, inst){
					scope.$apply(function(scope){
						ngModel.assign(scope, dateText);
					});
				}
			});
		});
	}
	
});


app.service('multipartForm',['$http', '$location', 'global', function($http, $location, global){
	this.post = function(uploadURL, data){
		var fd = new FormData();
		for (var key in data){
			fd.append(key, data[key]);
		}
		$http.post(uploadURL, fd, {
			transformRequest: angular.indentity,
			headers: {'Content-Type': undefined}
		})
		.success(function(){
			console.log('data uploaded successfully')
			$location.path("/");
			global.setIsUploadSuccessFul(true);	
		})
		.error(function(err){
			console.log(err);
		});
	}
}]);

app.factory("global", function() {
	var o = {
		isUploadSuccessful: false,
		searchQuery: ""
	};

	return {
		setSearchQuery: function(query){
			o.searchQuery = query;
		},
		setIsUploadSuccessFul: function(isIt){
			o.isUploadSuccessful = isIt;
		},
		getData: function(){
			return o;
		}
	}
	
});


app.controller("mainPageCtrl", ['$scope', function($scope) {
	$scope.testString = "main page test string";
}]);

app.controller("postNotesCtrl", ['$scope', 'multipartForm', 'global',
	function($scope, multipartForm, global) {

		global.setIsUploadSuccessFul(false);
		
		$scope.newNote = {};
		$scope.errorMsg = null;
		$scope.uploadedInvalidFile = false;
		$scope.fileNames = [];
		var numFiles = 0;

		
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

			}
			
		}
	};
}]);

app.controller("allNotesCtrl", ['$scope', '$http', 'global',
	function($scope, $http, global) {

		$scope.data = {};
		$scope.searchQuery = global.getData().searchQuery;

		global.setIsUploadSuccessFul(false);

		$scope.clearSearch = function(){
			$scope.searchQuery = "";
		}

		$scope.setQuery = function(query){
			$scope.searchQuery = query;
		}

		$scope.refreshData = function(){
			$http.get("/allNotes").success(function(data){
				$scope.data.notes = data;
			}).error(function(err){
				$scope.data.error = err;
			});
		}

		$scope.refreshData();

	}]);



app.controller("mainPageCtrl", ['$scope', '$http', '$location', 'global', function($scope, $http, $location, global) {
	console.log(global.getData().isUploadSuccessful);
	$scope.isUploadSuccessful = global.getData().isUploadSuccessful;
	$scope.searchQuery = "";

	$scope.goAllNotes = function(){
		global.setSearchQuery($scope.searchQuery);
		$location.path('/allNotes');
	}

	$scope.goPostNotes = function(){
		$location.path('/postNotes');
	}

}]);


