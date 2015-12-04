var path = require('path');
var Forester = require('forester');

var boot = require('./boot');

var app = new Forester();

app.registerConfig('jwt', { secret: 'secret', options: {} });
app.registerCollection(require('../collections/objects.json'));
app.registerDataSource(require('../datasources/mongodb.json'));
app.registerMappings(require('../config/mappings.json'));

app.registerStaticRoute({ path: path.join(__dirname, '../public') })
app.registerStaticRoute({ route: '/storage', path: path.join(__dirname, '../storage') })

app.boot()
  .then(function () {
    app.listen({ port: 3000 });
  })
  .then(function () {
    return boot(app);
  })
  .catch(function (error) {
    console.log(error)
  });
