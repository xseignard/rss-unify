// Routes module
define(['app'], function(app) {
  
	/**
	 * Setup the routing
	 */
	var setupRoutes = function() {
		app.config(['$routeProvider', function($routeProvider) {
			$routeProvider.
				// root of the app : welcome message
				when('/', {
					templateUrl : 'partials/welcome.html'
				}).
				// render selected feed
				when('/:topic', {
					templateUrl: 'partials/feed.html',
					controller: 'feedCtrl'
				}).
				// see details of the feed
				when('/:topic/details', {
					templateUrl: 'partials/feed-details.html',
					controller: 'feedDetailsCtrl'
				}).
				// render rss feed
				when('/:topic/rss', {
					controller: 'rssCtrl'
				}).
				// other cases : redirect to the root of the app
				otherwise({redirectTo: '/'});
		}]);
	};
  
	return setupRoutes();

});