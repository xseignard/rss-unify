module.exports = function(grunt) {

	// remove report dir if exists
	(function() {
		require('child_process').exec('rm -rf reports');
	}());

	// run a custom shell command
	var runCmd = function(cmd, done) {
		var exec = require('child_process').exec;
		// the cmd runner
		var run = function(item, callback) {
			grunt.log.writeln(item);
			var cmd = exec(item);
			cmd.stdout.on('data', function(data) {
				grunt.log.write(data);
			});
			cmd.stderr.on('data', function(data) {
				grunt.log.errorlns(data);
			});
			cmd.on('exit', function(code) {
				if (code !== 0) throw new Error(item + ' failed');
				callback();
			});
		};
		// finally run the given cmd
		run(cmd, done);
	};

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			// banner that wil be used in files
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + 
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' + 
				'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' + 
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + 
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */',
			distDir: 'dist/'
		},
		jshint: {
			all: ['src/scripts/**/*.js', 'test/**/*.js', 'Gruntfile.js'],
			checkstyle: 'checkstyle.xml',
			options: {
				jshintrc: '.jshintrc'
			}
		},
		karma: {
			// shared conf
			options: {
				configFile: 'config/karma.conf.js'
			},
			// dev mode: autowatch through watch task
			unit: {},
			// continuous integration mode: run tests once in PhantomJS browser.
			ci: {
				singleRun: true,
				browsers: ['PhantomJS'],
				// reporters to run
				reporters: ['junit', 'coverage'],
				// files to be instrumented for code coverage
				preprocessors: {
					'**/src/scripts/**/*.js': 'coverage'
				},
				junitReporter: {
					outputFile: 'reports/xunit.xml'
				},
				coverageReporter: {
					type: 'cobertura',
					dir: 'reports/coverage',
					file: 'coverage.xml'
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					name: 'app',
					baseUrl: '<%= meta.distDir %>/scripts/app',
					mainConfigFile: '<%= meta.distDir %>/scripts/main.js',
					out: '<%= meta.distDir %>/test.js',
					optimize: 'none'
				}
			}
		},
		clean: ['<%= meta.distDir %>', 'components'],
		copy: {
			main: {
				files: [
					{expand: true, cwd: 'src/', src: ['**'], dest: '<%= meta.distDir %>'},
					{src: ['components/**'], dest: '<%= meta.distDir %>'}
				]
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
	
	// bower install task
	grunt.registerTask('bower', 'Install bower dependencies', function() {
		runCmd('bower install', this.async());
	});
	
	// checkstyle task
	grunt.registerTask('checkstyle', 'Generate checkstyle report', function() {
		runCmd('cd config;make checkstyle', this.async());
	});

	// task loading
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	// task def
	grunt.registerTask('build', ['clean', 'jshint:all', 'karma:ci', 'copy', 'requirejs']);
    // ci task
	grunt.registerTask('ci', ['clean', 'jshint:all', 'checkstyle', 'bower', 'karma:ci']);

};