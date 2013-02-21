// requirejs config
require.config({
	// modules paths
	baseUrl: 'scripts/app',
	// vendor lib paths
	paths: {
		jquery          : '../vendor/jquery/jquery',
		angular         : '../vendor/angular/angular',
		angularSanitize : '../vendor/angular-sanitize/angular-sanitize'
	},
	shim: {
		'angular'         : {exports : 'angular'},
		'angularSanitize' : {deps : ['angular']}
	},
	priority: [
		'angular'
	]
});

// start the main app logic.
require(['angular', 'app', 'controllers', 'routes', 'angularSanitize'],
function(angular, app) {
	// this function will be called when all the dependencies listed above are loaded
	angular.bootstrap(document, ['rss-unify']);
});