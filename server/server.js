var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var env = require('node-env-file');

var app = module.exports = loopback();

env(__dirname + '/.env');

app.start = function() {
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

boot(app, __dirname, function(err) {
  if (err) throw err;

  app.use(loopback.static(path.resolve(__dirname, '../public')));

  var index = path.resolve(__dirname, '../public/index.html');

  app.middleware('final', function (req, res) {
    res.sendFile(index);
  });

  if (require.main === module)
    app.start();
});
