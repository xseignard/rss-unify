// Routes module
define(function() {
  
	/**
	 * Setup the routing
	 */
	var setupRoutes = function(app) {
		app.config(['$routeProvider', function($routeProvider) {
			$routeProvider.
				// root of the app : welcome message
				when('/', {
					templateUrl : 'partials/welcome.html'
				}).
				// render selected feed
				when('/topic/:topic', {
					templateUrl: 'partials/feed.html',
					controller: 'feedCtrl'
				}).
				// see details of the feed
				when('/topic/:topic/details', {
					templateUrl: 'partials/feed-details.html',
					controller: 'feedDetailsCtrl'
				}).
				// add a new feed
				when('/new', {
					templateUrl: 'partials/new-feed.html',
					controller: 'newFeedCtrl'
				}).
				// render rss feed
				when('/topic/:topic/rss', {
					controller: 'rssCtrl'
				}).
				// other cases : redirect to the root of the app
				otherwise({redirectTo: '/'});
		}]);
	};
  
	return setupRoutes;

});