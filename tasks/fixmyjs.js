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

  grunt.task.registerMultiTask('fixmyjs', 'Fix your JavaScript.', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      // config: [.jshintrc], load your own config file
      // diff: Similar to dry-run
      // legacy: Use legacy fixmyjs
      // indent-pref: [tabs|spaces], your indentation preference
      // patch: Output a patch file to stdout
      // dry-run: Performs a dry-run and shows you a diff
      // silent: A useless option
    });

    // Extend default options with options from specified jshintrc file
    if (options.jshintrc) {
      options = grunt.util._.extend(options, grunt.file.readJSON(options.jshintrc));
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

      // First, comment out '#!/usr/bin/env node' since it breaks fixmyjs.
      srcFile = srcFile.replace(/(#!\/usr\/bin\/env node)/g, '//$1');

      // Handle options.
      var fixjs = fixJavaScript(srcFile, options);
      if (fixjs.length < 1) {
        grunt.log.warn('Destination not written because dest file was empty.');
      } else {
        // Write the destination file, and remove comments
        // before '#!/usr/bin/env node' as files are fixed.
        grunt.file.write(fp.dest, fixjs.replace(/(\/\/)(#!\/usr\/bin\/env node)/g, '$2'));

        // Print a success message.
        grunt.log.ok('File "' + fp.dest + '" fixed' + chalk.green('...OK'));
      }
    });
  });

  var fixJavaScript = function(source, options) {
    try {
      return fixmyjs.fix(source, options);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('JavaScript fixification failed.');
    }
  };
};
