var app = angular.module('noteShareApp',["ngRoute"]);

app.config( ['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/allNotes', {
				templateUrl: 'views/allNotesView.html'
			})
			.when('/postNotes', {
				templateUrl: 'views/postNotesView.html'
			})
			.otherwise({
				//redirectTo: 'view/mainPageView.html'
				templateUrl: 'views/mainPageView.html'
			});
	}]);
