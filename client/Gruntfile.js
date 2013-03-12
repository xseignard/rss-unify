module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			// banner that wil be used in files
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + 
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' + 
				'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' + 
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + 
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
		},
		jshint: {
			all: ['src/scripts/**/*.js', 'test/**/*.js', 'Gruntfile.js'],
			options: {
				jshintrc: '../.jshintrc'
			}
		},
		testacular: {
			// shared conf
			options: {
				configFile: 'config/testacular.conf.js'
			},
			// dev mode: autowatch through watch task
			unit: {},
			// continuous integration mode: run tests once in PhantomJS browser.
			ci: {
				singleRun: true,
				browsers: ['PhantomJS']
			}
		},
		requirejs: {
			compile: {
				options: {
					mainConfigFile: "src/scripts/main.js",
					out: "../dist/test.js"
				}
			}
		},
		watch: {
			//run unit tests with testacular (server needs to be already running)
			testacular: {
				files: ['src/scripts/**/*.js', 'test/**/*.test.js'],
				tasks: ['testacular:unit:run']
			}
		}
	});

	// task loading
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('gruntacular');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	
	// task def
    // ci task
	grunt.registerTask('ci', ['jshint', 'testacular:ci']);

};