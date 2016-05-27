var http = require('http'),
	//port = require('./config').server.port,
	conf = require('./config/index'),
	express = require('express'),
    path = require('path');

var env = process.env.NODE_ENV;
console.log('Environment variable NODE_ENV has been set to ' + env);

port = conf(env).server.port;

var app = express();  
app.set('port', port);

//app.use(app.router);
app.use('/',express.static(path.join(__dirname, '/public')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Server started on port ' + port);
});