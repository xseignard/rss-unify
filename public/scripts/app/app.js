define(['angular'], function(angular) {
	// init the angular app with its dependent modules
	var app = angular.module('rss-unify', ['ngSanitize']);
	// bind the $location service to the $rootScope in order to access the service from children $scopes
	app.run(function($rootScope, $location) {
		$rootScope.location = $location;
	});
	return app;
});