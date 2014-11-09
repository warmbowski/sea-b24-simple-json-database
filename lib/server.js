'use strict';
var express = require('express');

var app = express();
var port = process.env.PORT ? process.env.PORT : 3000;

require('./routes/api_routes.js')(app);

app.listen(port);
console.log('Server running on port: ' + port);
