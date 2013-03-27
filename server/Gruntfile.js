'use strict';
module.exports = function(grunt) {
	
	// remove report dir if exists, and set required env vars
	(function() {
		process.env.XUNIT_FILE = 'reports/xunit.xml';
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
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
		},
		jshint: {
			all: ['src/**/*.js', 'test/**/*.js', 'Gruntfile.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		simplemocha: {
			options: {
				reporter: 'xunit-file'
			},
			all: { src: 'test/**/*.test.js' }
		}
	});

	// coverage task
	grunt.registerTask('coverage', 'Generate coverage report', function() {
		runCmd('cd config;make coverage', this.async());
	});
	
	// checkstyle task
	grunt.registerTask('checkstyle', 'Generate checkstyle report', function() {
		runCmd('cd config;make checkstyle', this.async());
	});

	// task loading
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-simple-mocha');

	// ci task
	grunt.registerTask('ci', ['jshint:all', 'checkstyle', 'simplemocha', 'coverage']);
};