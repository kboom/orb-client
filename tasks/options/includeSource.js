module.exports = {
    options: {
        basePath: '<%= cfg.tmp %>',
        //ordering: 'top-down',
        templates: {
            html: {
                js: '<script src="{filePath}"></script>',
                css: '<link rel="stylesheet" type="text/css" href="{filePath}" />'
            }
        }
    },
    assembly: {
        files : {
            "<%= cfg.tmp %>/main/index.html" : "<%= cfg.tmp %>/main/index.html"
        }
    }
}
