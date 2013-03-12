// requirejs config
require.config({
	// modules paths
	baseUrl: 'scripts/app',
	// vendor lib paths
	paths: {
		jquery          : '../../../components/jquery/jquery',
		angular         : '../../../components/angular/angular',
		angularSanitize : '../../../components/angular-sanitize/angular-sanitize'
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
require(['angular', 'app'],
function(angular, app) {
	// this function will be called when all the dependencies listed above are loaded
	angular.bootstrap(document, ['rss-unify']);
});