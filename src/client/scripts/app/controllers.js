// Controllers module
define(function() {

	/**
	 * Controller to list available feeds
	 */
	var _feedListCtrl = function($scope, $http) {
		// http call to get the feeds
		var _getFeeds = function() {
			$http.get('api/1/').success(function(data) {
				$scope.feeds = data;
			});
		};
		// actually get the feeds
		_getFeeds();
		// each time a topic is added, re-fetch them from the server
		$scope.$on('addedTopic', _getFeeds());
		
	};
	
	/**
	 * Controller to get a specific feed
	 */
	var _feedCtrl = function($scope, $http, $routeParams) {
		$http.get('api/1/' + $routeParams.topic).success(function(data) {
			$scope.feed = data;
		});
	};
	
	/**
	 * Controller to get the details of a feed
	 */
	var _feedDetailsCtrl = function($scope, $http, $routeParams) {
		$http.get('api/1/' + $routeParams.topic + '/details').success(function(data) {
			$scope.details = data;
		});
	};
	
	/**
	 * Controller to create a new feed
	 */
	var _newFeedCtrl = function($window, $scope, $http, $rootScope) {
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
					// broadcast a message to tell that a topic has been added
					$rootScope.$broadcast('addedTopic');
					// go to the feed page
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
	var _rssCtrl = function($window) {
		// only redirect to the rss feed
		console.log($window.location.href.replace('#/topic','api/1'));
		$window.location = $window.location.href.replace('#/topic','api/1');
	};
	
	return {
		feedListCtrl    : _feedListCtrl,
		feedCtrl        : _feedCtrl,
		feedDetailsCtrl : _feedDetailsCtrl,
		newFeedCtrl     : _newFeedCtrl,
		rssCtrl         : _rssCtrl
	};
});