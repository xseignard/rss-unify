define(['angular', 'controllers'], function(angular, controllers) {
	// init the angular app with its dependent modules
	var app = angular.module('rss-unify', ['ngSanitize']);
	// bind the $location service to the $rootScope in order to access the service from children $scopes
	app.run(function($rootScope, $location) {
		$rootScope.location = $location;
	});
	
	// attach the controllers
	app.controller('feedListCtrl', controllers.feedListCtrl);
	app.controller('feedCtrl', controllers.feedCtrl);
	app.controller('feedDetailsCtrl', controllers.feedDetailsCtrl);
	app.controller('rssCtrl', controllers.rssCtrl);

	return app;
});