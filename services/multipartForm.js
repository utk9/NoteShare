angular.module('noteShareApp')
.service('multipartForm',['$http', '$location', function($http, $location){
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
        })
        .error(function(err){
        	console.log(err);
        });
	}
}]);