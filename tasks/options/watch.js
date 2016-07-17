module.exports = {
  options: {
    event: "changed"
  },
  config: {
    files: "<%= cfg.source.dir.base %>/**/*.json",
    tasks: ["sync:source2target"]
  },
  index: {
    files: "<%= cfg.source.dir.main %>/<%= cfg.source.files.index %>",
    tasks: ["newer:htmlhint", "processIndex"]
  },
  scripts: {
    files: "<%= cfg.source.dir.base %>/**/*.js",
    tasks: ["newer:jshint", "sync:source2target"]
  },
  views: {
    files: ["<%= cfg.source.dir.base %>/**/*.html", "!<%= cfg.source.dir.main %>/index.html"],
    tasks: ["newer:htmlhint", "sync:source2target"]
  },
  styles: {
    files: "<%= cfg.source.dir.base %>/**/*.less",
    tasks: ["processStyles"]
  },
  dynamicImages: {
    files: "<%= cfg.source.dir.base %>/**/*.xml",
    tasks: ["sync:source2target"]
  },
  addOrRemove: {
    options: {
      event: ['added', 'removed']
    },
    files: "<%= cfg.source.dir.base %>",
    tasks: "rebuild"
  },
  reload: {
    options: {
      event: ['added', 'changed'],
      livereload: false
    },
    files: "<%= cfg.target.dir.base %>/**",
    tasks: ""
  }
}
