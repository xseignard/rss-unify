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
	// run npm install then bower install
	grunt.registerTask('install', 'install the backend and frontend dependencies', function() {
		var async = require('async');
		var exec = require('child_process').exec;
		var done = this.async();
		
		var runCmd = function(item, callback) {
			process.stdout.write('running "' + item + '"...\n');
			var cmd = exec(item);
			cmd.stdout.on('data', function (data) {
				process.stdout.write(data);
			});
			cmd.stderr.on('data', function (data) {
				process.stdout.write(data);
			});
			cmd.on('exit', function (code) {
				if (code !== 0) throw new Error('test');
				process.stdout.write('done\n');
				callback();
			});
		};
		
		async.series({
			npm: function(callback){
				runCmd('npm install', callback);
			},
			bower: function(callback){
				runCmd('bower install', callback);	
			}
		},
		function(err, results) {
			if (err) done(false);
			done();
		});
    });
    // ci task
	grunt.registerTask('ci', ['jshint', 'install', 'testacular:ci']);

};