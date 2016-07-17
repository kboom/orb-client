module.exports = function(grunt) {
    grunt.registerTask('rebuild', 'Rebuilds the application.', function () {
        grunt.task.run('validate');
        grunt.task.run('sync:source2tmp');
        grunt.task.run('process');
        grunt.task.run('sync:tmp2target');
    });
}