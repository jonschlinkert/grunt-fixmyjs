/*
 * grunt-fixmyjs
 * https://github.com/jonschlinkert/grunt-fixmyjs
 *
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var chalk = require('chalk');
  var fixmyjs = require('fixmyjs');
  var JSON5 = require('json5');
  var _ = grunt.util._;

  grunt.task.registerMultiTask('fixmyjs', 'Fix your JavaScript.', function() {
    var options = this.options({
      config: '.jshintrc'
    });

    // Extend default options with options from specified jshintrc file
    if (options.config) {
      options = _.extend(options, JSON5.parse(grunt.file.read(options.config)));
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(fp) {
      var srcFile = fp.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(grunt.file.read).join(grunt.util.normalizelf(grunt.util.linefeed));

      var escaped;
      // First, comment out '#!/usr/bin/env node' since it breaks fixmyjs.
      if (srcFile.indexOf('#!/usr') === 0) {
        escaped = true;
        srcFile = '//' + srcFile;
      }

      // Handle options.
      var fixedjs = fix(srcFile, options);
      if (fixedjs.length < 1) {
        grunt.log.warn('Destination not written because dest file was empty.');
      } else {
        if (escaped) {
          fixedjs = fixedjs.slice(2);
        }
        grunt.file.write(fp.dest, fixedjs);

        // Print a success message.
        grunt.log.ok('File "' + fp.dest + '" fixed' + chalk.green('...OK'));
      }
    });
  });

  function fix(source, options) {
    try {
      if (options.legacy) {
        var jshint = require('jshint').JSHINT;
        jshint(source, options);
        return fixmyjs(jshint.data(), source, options).run();
      }
      return fixmyjs.fix(source, options);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('JavaScript fixification failed.');
    }
  }
};
