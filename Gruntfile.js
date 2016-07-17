'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-*', '@*/grunt-*', 'assemble-less'],
    scope: ['devDependencies', 'dependencies']
  });

  var nameOverrides = {
    'assemble-less': 'less'
  };

  function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;
    glob.sync('*', {cwd: path}).forEach(function (option) {
      key = option.replace(/\.js$/, '');
      var taskName = nameOverrides.hasOwnProperty(key) ? nameOverrides[key] : key;
      object[taskName] = require(path + option);
    });
    return object;
  }

  var gruntConfig = grunt.util._.extend(loadConfig('./tasks/options/'), {
    cfg: grunt.file.readJSON('bower.json')
  });

  grunt.initConfig(gruntConfig);
  grunt.loadTasks('tasks/processing');
  grunt.loadTasks('tasks');
};
