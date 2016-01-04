var path = require('path');
var fs = require('fs');

var codes = fs.readdirSync(path.join(__dirname, '../storage'));

module.exports = function (app) {

  return;

  var collection = app.collections['objects'];

  var data = codes.filter(function (code) {
      return code.indexOf('.') < 0;
    })
    .map(function (code) {
      return { code: code};
    });

  return collection.create(data)
    .then(function (response) {
      console.log('boot data', response);
    })
    .catch(function (error) {
      console.log('error', error);
    })

};