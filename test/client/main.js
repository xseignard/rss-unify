/**
 * Get all tests files (i.e. ending with .test.js and in the test/client folder)
 */
var getTests = function() {
	var testDir = '/base/test/client',
		testPattern = '.test.js',
		extension = '.js',
		tests = [];
	
	for (var file in window.__testacular__.files) {
		if (file.indexOf(testDir) !== -1 && file.indexOf(testPattern) !== -1) { 
			// make the test file path relative to the requirejs baseUrl
			var test = file.replace('/base', '../../../..');
			test = test.substring(0, test.length - extension.length);
			tests.push(test);
		}
	}
	tests.push('angularMocks');
	return tests;
};

// requirejs config
require.config({
	// testacular serves files from '/base'
	baseUrl: '/base/src/client/scripts/app',
	paths: {
		jquery          : '../vendor/jquery/jquery',
		angular         : '../vendor/angular/angular',
		angularSanitize : '../vendor/angular-sanitize/angular-sanitize',
		angularMocks    : '../vendor/angular-mocks/angular-mocks'
	},
	shim: {
		'angular'         : {exports : 'angular'},
		'angularSanitize' : {deps : ['angular']},
		'angularMocks'    : {deps : ['angular']}
	},
	priority: [
		'angular'
	]
});


// start the tests
require(getTests(), function() {
	window.__testacular__.start();
});