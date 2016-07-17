module.exports = function(grunt) {
    grunt.registerTask('processStyles', ['sync:source2tmp','newer:less','newer:csslint','sync:tmp2target']);
};
