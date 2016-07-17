module.exports = function (grunt) {
    grunt.registerTask('process', 'Processes the sources in tmp.', ['wiredep:prefixed', 'less', 'csslint', 'wiredep:prefixless', 'includeSource']);
};
