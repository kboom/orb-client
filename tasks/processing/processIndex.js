module.exports = function(grunt) {
    grunt.registerTask('processIndex', ['sync:source2tmp','newer:includeSource',"wiredep:prefixless",'sync:tmp2target']);
};