module.exports = function(grunt) {
    grunt.registerTask('validate', 'Validates the application.', ['jshint:main', 'jshint:test', 'htmlhint:main']);
};