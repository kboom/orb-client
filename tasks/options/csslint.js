module.exports = {
    strict: {
        options: {
            'import': 2,
            'adjoining-classes': false,
            'fallback-colors': false,
            'box-sizing': false
        },
        src: [ "<%= cfg.tmp %>/main/**/*.css", "<%= cfg.tmp %>/test/**/*.css" ]
    }
}
