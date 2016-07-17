module.exports = {
    options : {
        exclude: /target\/lib\/bootstrap\/.*$/
    },
    prefixed: {
        src: '<%= cfg.tmp %>/**/*.{html,scss,sass}'
    },
    prefixless: {
        src: "<%= cfg.tmp %>/**/*.{html,scss,sass}",
        ignorePath: /^.*\/(?=lib)/
    }
}