module.exports = {
  bootstrap: {
    options: {
      paths: ["<%= cfg.source.dir.external %>/bootstrap/less", "<%= cfg.source.dir.main %>/styles/variables"]
    },
    files: [{
      expand: true,
      cwd: '<%= cfg.source.dir.main %>/styles/external',
      src: ["bootstrap-compiled.less"],
      dest: '<%= cfg.tmp %>/external',
      ext: '.css'
    }]
  },
  fontawesome: {
    options: {
      paths: ["<%= cfg.source.dir.external %>/font-awesome/less", "<%= cfg.source.dir.main %>/styles/variables"]
    },
    files: [{
      expand: true,
      cwd: '<%= cfg.source.dir.main %>/styles/external',
      src: ["font-awesome-compiled.less"],
      dest: '<%= cfg.tmp %>/external',
      ext: '.css'
    }]
  },
  sources: {
    options: {
      paths: [
        "<%= cfg.source.dir.main %>",
        "<%= cfg.source.dir.main %>/styles",
        "<%= cfg.source.dir.main %>/styles/mixins",
        "<%= cfg.source.dir.main %>/styles/external",
        "<%= cfg.source.dir.external %>"
      ],
      imports: {
        reference: [
          "bootstrap/less/variables.less",
          "font-awesome/less/variables.less",
          "variables/bootstrap-variables.less",
          "variables.less"
        ]
      }
    },
    files: [{
      expand: true,
      cwd: '<%= cfg.tmp %>',
      src: ["**/*.less", "!**/styles/**/*", "**/styles/*.less"],
      dest: '<%= cfg.tmp %>',
      ext: '.css'
    }]
  }
}
