/**
 * Get all tests files (i.e. ending with .test.js and in the test/ folder)
 */
var getTests = function() {
	var testDir = '/base/test',
		testPattern = '.test.js',
		extension = '.js',
		tests = [];
	
	for (var file in window.__karma__.files) {
		if (file.indexOf(testDir) !== -1 && file.indexOf(testPattern) !== -1) { 
			// make the test file path relative to the requirejs baseUrl as defined below
			var test = file.replace('/base', '../../..');
			test = test.substring(0, test.length - extension.length);
			tests.push(test);
		}
	}
	// add other libs
	tests.push('angularMocks');
	return tests;
};

// requirejs config
require.config({
	// testacular serves files from '/base'
	baseUrl: '/base/src/scripts/app',
	paths: {
		jquery          : '../../../components/jquery/jquery',
		angular         : '../../../components/angular/angular',
		angularSanitize : '../../../components/angular-sanitize/angular-sanitize',
		angularMocks    : '../../../components/angular-mocks/angular-mocks'
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
	window.__karma__.start();
});