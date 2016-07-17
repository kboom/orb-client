module.exports = {
  options: {
    curly: true,
    eqeqeq: false,
    eqnull: true,
    browser: true,
    globals: {
      jQuery: true,
      angular: true
    }
  },
  main: {
    files: {
      src: ["<%= cfg.source.dir.main %>/**/*.js"]
    }
  },
  test: {
    files: {
      src: ["<%= cfg.source.dir.test %>/**/*.js"]
    }
  }
};
