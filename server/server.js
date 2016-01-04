var path = require('path');
var Forester = require('forester');
var explorer = require('forester-explorer');

var app = new Forester();

// app.use(explorer());

app.registerCollection(require('../collections/objects.json'));
app.registerDataSource(require('../datasources/mongodb.json'));
app.registerMappings(require('../config/mappings.json'));
app.registerStaticRoute({ path: path.join(__dirname, '../public') })
app.registerStaticRoute({ route: '/storage', path: path.join(__dirname, '../storage') });

app.boot()
  .then(function () {
    app.listen({ port: 3000 });
  })
  .catch(function (error) {
    console.log(error)
  });
