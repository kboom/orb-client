module.exports = function(grunt) {
    grunt.registerTask('build', 'Builds the application.', function() {

        grunt.log.writeln("--- Validating the sources ---");
        grunt.task.run(['validate']);

        grunt.log.writeln("--- Preparing processing workspace ---");
        grunt.task.run(['clean:targetUser']);
        grunt.task.run(['clean:tmp']);
        grunt.task.run(['copy:source2tmp']);
        grunt.task.run(['bower:install']);

        grunt.task.run('process');

        grunt.log.writeln("--- Finalizing ---");
        grunt.task.run(['copy:tmp2target', 'copy:externalsToTarget']);
        grunt.task.run(['clean:tmp']);
        grunt.log.writeln("Build done in 10s");

    });
};
