// base path, that will be used to resolve files and exclude
var basePath = '..';


// list of files / patterns to load in the browser
files = [
  // adapters to be loaded
  JASMINE,
  JASMINE_ADAPTER,
  REQUIRE,
  REQUIRE_ADAPTER,
  
  // libs
  {pattern: 'src/client/scripts/vendor/angular*/angular*.js', included: false},

  // app files
  {pattern: 'src/client/scripts/main.js', included: false},
  {pattern: 'src/client/scripts/app/**/*.js', included: false},
  // test files
  {pattern: 'test/client/**/*.test.js', included: false},
  
  // files are now accessible from the browser, load them with require
  'test/client/main.js'
];

// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome'];

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
