// Controllers module
define(function() {

	// object holding the controllers
	var controllers = {};

	/**
	 * Controller to list available feeds
	 */
	controllers.feedListCtrl = function($scope, $http) {
		$http.get('api/1/').success(function(data) {
			$scope.feeds = data;
		});
	};
	
	/**
	 * Controller to get a specific feed
	 */
	controllers.feedCtrl = function($scope, $http, $routeParams) {
		$http.get('api/1/' + $routeParams.topic).success(function(data) {
			$scope.feed = data;
		});
	};
	
	/**
	 * Controller to get the details of a feed
	*/
	controllers.feedDetailsCtrl = function($scope, $http, $routeParams) {
		$http.get('api/1/' + $routeParams.topic + '/details').success(function(data) {
			$scope.details = data;
		});
	};
	
	/**
	 * Controller to get the rss feed
	 */
	controllers.rssCtrl = function($window) {
		// only redirect to the rss feed
		$window.location.href = $window.location.href.replace('#','api/1');
	};
		
	return controllers;
});