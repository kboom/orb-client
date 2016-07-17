module.exports = function(grunt) {
    grunt.registerTask('processWiredep', ['sync:source2tmp','wiredep','sync:tmp2target']);
};