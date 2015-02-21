/*!
 * grunt-fixmyjs <https://github.com/jonschlinkert/grunt-fixmyjs>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function(grunt) {

  // Report the elapsed execution time of tasks.
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'tasks/*.js'],
      options: {jshintrc: '.jshintrc'}
    },

    // Before generating any new files, remove any previously-created files.
    clean: {tests: ['tmp/**/*']},

    fixmyjs: {
      options: {
        curly: true,
        quotmark: 'single',
        plusplus: true,
        asi: false
      },
      test: {
        files: [
          {
            expand: true,
            cwd: 'fixtures',
            src: ['**/*.js'],
            dest: 'tmp/',
            ext: '.js'
          }
        ]
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['fixmyjs']); // 'nodeunit'

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
