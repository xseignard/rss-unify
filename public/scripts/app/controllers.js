// Controllers module
define(['app'], function(app) {

	/**
	 * Controller for listing available feeds
	 */
	var feedListCtrl = function($scope, $http) {
		$http.get('api/1/').success(function(data) {
			$scope.feeds = data;
		});
	};
	
	/**
	 * Controller for getting a specific feed
	 */
	var feedCtrl = function($scope, $http, $routeParams) {
		$http.get('api/1/' + $routeParams.topic).success(function(data) {
			$scope.feed = data;
		});
	};
	
	/**
	 * Function to attach the controllers to the app
	 */
	var attachControllers = function() {
		app.controller('feedListCtrl', feedListCtrl);
		app.controller('feedCtrl', feedCtrl);
		
		return app;
	};
	
	return attachControllers();
});