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
			all: ['src/**/*.js', 'test/**/*.js', 'app.js', 'Gruntfile.js', '!src/client/scripts/vendor/**/*.js'],
			options: {
				jshintrc: '.jshintrc'
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
		watch: {
			//run unit tests with testacular (server needs to be already running)
			testacular: {
				files: ['src/client/scripts/main.js', 'src/client/scripts/main.js', 'test/client/**/*.test.js'],
				tasks: ['testacular:unit:run']
			}
		}
	});

	// task loading
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('gruntacular');
	
	// task def
    // ci task
	grunt.registerTask('ci', ['jshint', 'testacular:ci']);

};