module.exports = {
  production: {
    options: {
      port: process.env.PORT,
      livereload: false,
      debug: false,
      keepalive: true,
      middleware: function (connect) {
        return [
          connect().use('/external', connect.static("./target/external")),
          connect().use('/lib', connect.static("./target/lib")),
          connect().use('/main', connect.static("./target/main")),
          connect.static("target/main")
        ];
      }
    }
  },
  development: {
    options: {
      port: 9000,
      livereload: 35729,
      debug: false,
      //open: {
      //  target: 'http://localhost:9000'
      //},
      middleware: function (connect) {
        return [
          connect().use('/external', connect.static("./target/external")),
          connect().use('/lib', connect.static("./target/lib")),
          connect().use('/main', connect.static("./target/main")),
          connect.static("target/main")
        ];
      }
    }
  },
  distributed: {
    options: {
      open: true,
      base: '<%= cfg.dist %>'
    }
  }
}
