module.exports = {
    source2tmp: {
        files: [
            { cwd: "<%= cfg.source.dir.base %>", src: "<%= cfg.source.resources %>", dest: "<%= cfg.tmp %>" }
        ],
        verbose: true
    },
    tmp2target: {
        files: [
            { cwd: "<%= cfg.tmp %>", src: "<%= cfg.target.resources %>", dest: "<%= cfg.target.dir.base %>" }
        ],
        verbose: true
    },
    source2target: {
        files: [
            { cwd: "<%= cfg.source.dir.base %>", src: "<%= cfg.target.resources %>", dest: "<%= cfg.target.dir.base %>" }
        ],
        verbose: true
    }
}