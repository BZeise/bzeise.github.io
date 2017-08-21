// requires
var express = require('express');
var path = require('path');
var app = express();

// uses
app.use(express.static('public'));

// globals
var port = process.env.PORT || 7878;

// serve index.html file, since we don't have an index.js route
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// spin up server
app.listen(port, function() {
  console.log('up on port', port);
});
