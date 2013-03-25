'use strict';
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
			all: ['src/**/*.js', 'test/**/*.js', 'Gruntfile.js'],
			checkstyle: 'checkstyle.xml',
			options: {
				jshintrc: '.jshintrc'
			}
		},
		simplemocha: {
			options: {
				reporter: 'xunit'
			},
			all: { src: 'test/**/*.test.js' }
		}
	});
	
	// coverage task
	grunt.registerTask('coverage', 'Generate coverage output', function() {
		var exec = require('child_process').exec;
		var done = this.async();

		var runCmd = function(item, callback) {
			grunt.log.write(item);
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

		runCmd('cd config;make coverage', done);
	});

	// task loading
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-simple-mocha');

	// ci task
	grunt.registerTask('ci', ['jshint:all', 'simplemocha', 'coverage']);
};