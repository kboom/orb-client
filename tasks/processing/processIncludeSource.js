module.exports = function(grunt) {
    grunt.registerTask('processStyles', ['sync:source2tmp',"wiredep:prefixed","newer:less","wiredep:prefixless",'sync:tmp2target']);
};
