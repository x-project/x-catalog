var fs = require('fs');
var mongojs = require('mongojs');

var db = mongojs('object');
var objects = db.collection('objects');

function read_file (file_name, callback) {
  fs.readFile(__dirname + file_name, 'utf8', function (err, text) {
    if (err) {
      callback(err, null);
      return;
    }
    
    var list = text.split('\n');
    callback(null, list);
  });
}

function insert (list) {
  list.forEach(function (item) {
    objects.insert({ code: item });       
  });
}

read_file('data.txt', function (err, list) {
  if (err) {
    console.log(err);
    return;
  }

  insert(list);
})