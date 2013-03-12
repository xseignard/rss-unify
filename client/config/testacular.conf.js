// base path, that will be used to resolve files and exclude
var basePath = '..';


// list of files / patterns to load in the browser
var files = [
  // adapters to be loaded
  JASMINE,
  JASMINE_ADAPTER,
  REQUIRE,
  REQUIRE_ADAPTER,
  
  // !! Note : {included: false} means accessible from the browser, 
  // but not included in a <script> tag, loaded with require
  
  // libs
  {pattern: 'components/angular*/angular*.js', included: false},

  // app files
  {pattern: 'src/scripts/**/*.js', included: false},

  // test files
  {pattern: 'test/**/*.test.js', included: false},
  
  // files are now accessible from the browser, load them with require
  'test/main.js'
];

// run tests on the following browsers
var browsers = ['Chrome'];

