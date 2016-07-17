module.exports = {
    dist: {
        options: {
            collapseWhitespace: true,
            conservativeCollapse: true,
            collapseBooleanAttributes: true,
            removeCommentsFromCDATA: true,
            removeOptionalTags: true
        },
        files: [
            {
                expand: true,
                cwd: '<%= cfg.target %>',
                src: '*.html',
                dest: '<%= cfg.target %>'
            }
        ]
    }
}