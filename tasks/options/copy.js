module.exports = {
  source2tmp: {
    expand: true,
    cwd: "<%= cfg.source.dir.base %>",
    src: "**",
    dest: '<%= cfg.tmp %>'
  },
  tmp2target: {
    expand: true,
    cwd: "<%= cfg.tmp %>",
    src: "<%= cfg.target.resources %>",
    dest: "<%= cfg.target.dir.base %>"
  },
  externalsToTarget: {
    expand: true,
    cwd: "<%= cfg.source.dir.external %>",
    src: "<%= cfg.source.extras %>",
    dest: "<%= cfg.target.dir.external %>"
  }
};
