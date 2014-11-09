'use strict';
var fs = require('fs');

var dbfolder = '/../../db/';

module.exports = function(app) {
  // help from http://stackoverflow.com/questions/20860005/storing-data-stream-from-post-request-in-gridfs-express-mongodb-node-js

  app.post('/:name', function(req, res) {
    var filename  = req.param('name') + '.json';
    var wstream = fs.createWriteStream(__dirname + dbfolder + filename);
    wstream.on('open', function() {
      req.pipe(wstream);
      res.send('Record Added');
    });
    wstream.on('error', function(err) {
      res.end('Cannot add record. (error: ' + err.code + ')');
    });
  });

  app.get('/:name', function(req, res) {
    var filename  = req.param('name') + '.json';
    var rstream = fs.createReadStream(__dirname + dbfolder + filename);
    rstream.on('open', function() {
      rstream.pipe(res);
    });
    rstream.on('error', function(err) {
      console.log('ERROR: ' + err.code + ' - ' + err.path);
      if (err.errno = 34) {
        res.end('Record does not exist.');
      } else {
        res.end('Cannot get record. (error: ' + err.code + ')');
      }
    });
  });
};
