// Controllers module
define(function() {

	// object holding the controllers
	var controllers = {};

	/**
	 * Controller to list available feeds
	 */
	controllers.feedListCtrl = function($rootScope, $scope, $http) {
		$http.get('api/1/').success(function(data) {
			$scope.feeds = data;
			// store it to the rootScope in order to access it elsewhere
			$rootScope.feeds = data;
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
	controllers.newFeedCtrl = function($window, $scope, $http) {
		// feed to be created
		$scope.feed = {};

		// save the new feed to the server
		$scope.save = function() {
			// set the state to saving
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
					$window.location.href = $window.location.href.replace('new', 'topic/' + $scope.feed.name);
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
		console.log($window.location.href.replace('#/topic','api/1'));
		$window.location.href = $window.location.href.replace('#/topic','api/1');
	};
		
	return controllers;
});