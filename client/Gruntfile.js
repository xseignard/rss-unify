module.exports = function(grunt) {

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
				browsers: ['PhantomJS'],
				reporters: ['dots', 'junit'],
				junitReporter: {
					outputFile: 'test-results.xml'
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
		var exec = require('child_process').exec;
		var done = this.async();
		
		var runCmd = function(item, callback) {
			var cmd = exec(item);
			cmd.stdout.on('data', function(data) {
				process.stdout.write(data);
			});
			cmd.stderr.on('data', function(data) {
				process.stdout.write(data);
			});
			cmd.on('exit', function(code) {
				if (code !== 0) throw new Error('Something went wrong');
				callback();
			});
		};

		runCmd('bower install', done);
	});

	// task loading
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('gruntacular');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	// task def
	grunt.registerTask('build', ['clean', 'jshint', 'testacular:ci', 'copy', 'requirejs']);
    // ci task
	grunt.registerTask('ci', ['clean', 'jshint', 'bower', 'testacular:ci']);

};