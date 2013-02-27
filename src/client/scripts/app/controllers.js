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
	 * Controller to create a new feed
	 */
	controllers.newFeedCtrl = function($scope, $http) {
		// feed to be created
		$scope.feed = {};

		// saves the new feed to the server
		$scope.save = function() {
			// sets the state to saving
			$scope.savingState = 'saving';
			// process the data to send
			var urls = $scope.urls.split('\n');
			var topic = {};
			topic.name = $scope.feed.name;
			topic.description = $scope.feed.desc;
			topic.feeds = urls;
			// post the data
			$http.post('api/1/new', JSON.stringify(topic)).
				// handle succes and errors
				success(function(data, status, headers, config) {
					$scope.savingState = 'saved';
				}).
				error(function(data, status, headers, config) {
					$scope.savingState = 'error';
				});
		};
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