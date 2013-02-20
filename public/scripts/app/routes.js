define(['app'], function(app) {
  
	/**
	 * Setup the routing
	 */
	var setupRoutes = function() {
		app.config(['$routeProvider', function($routeProvider) {
			$routeProvider.
				// root of the app : list available feeds
				when('/', {
					templateUrl : 'partials/feeds-list.html',
					controller : 'feedListCtrl'
				}).
				// selected feed : render it
				when('/:topic', {
					templateUrl: 'partials/feed-detail.html',
					controller: 'feedDetailCtrl'
				}).
				// other cases : redirect to the root of the app
				otherwise({redirectTo: '/'});
		}]);
	};
  
	return setupRoutes();

});