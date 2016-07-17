module.exports = function(grunt) {
    grunt.registerTask('serve', 'Serves the application for development purposes.', ['connect:development','watch']);
};