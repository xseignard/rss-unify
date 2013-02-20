require.config({
	// modules paths
	baseUrl: 'scripts/app',
	// vendor lib paths
	paths: {
		jquery: '../vendor/jquery/jquery',
		angular: '../vendor/angular/angular'
	},
	shim: {
		'angular' : {
			exports : 'angular'
		}
	},
	priority: [
		'angular'
	]
});

// start the main app logic.
require(['angular', 'app', 'controllers', 'routes'],
function(angular, app) {
	// this function will be called when all the dependencies listed above are loaded
	angular.bootstrap(document, ['rss-unify']);
	console.log(app);
});