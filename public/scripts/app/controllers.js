// Controllers module
define(['app'], function(app) {

	/**
	 * Controller to list available feeds
	 */
	var feedListCtrl = function($scope, $http) {
		$http.get('api/1/').success(function(data) {
			$scope.feeds = data;
		});
	};
	
	/**
	 * Controller to get a specific feed
	 */
	var feedCtrl = function($scope, $http, $routeParams) {
		$http.get('api/1/' + $routeParams.topic).success(function(data) {
			$scope.feed = data;
		});
	};
	
	/**
     * Controller to get the details of a feed
	 */
    var feedDetailsCtrl = function($scope, $http, $routeParams) {
        $http.get('api/1/' + $routeParams.topic + '/details').success(function(data) {
            $scope.details = data;
        });
    };
	
	/**
	 * Controller to get the rss feed
	 */
	var rssCtrl = function($location, $routeParams) {
		// TODO : implement it!
	};
	
	/**
	 * Function to attach the controllers to the app
	 */
	var attachControllers = function() {
		app.controller('feedListCtrl', feedListCtrl);
		app.controller('feedCtrl', feedCtrl);
		app.controller('feedDetailsCtrl', feedDetailsCtrl);
		app.controller('rssCtrl', rssCtrl);
		
		return app;
	};
	
	return attachControllers();
});