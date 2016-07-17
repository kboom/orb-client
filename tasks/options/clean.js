module.exports = {
    targetAll : "<%= cfg.target.dir.base %>/**/*",
    targetUser : ['<%= cfg.target.dir.main %>', '<%= cfg.target.dir.test %>'],
    tmp: '<%= cfg.tmp %>',
    sass: [ '<%= cfg.tmp %>/.sass' ]
}