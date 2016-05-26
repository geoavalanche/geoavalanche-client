var http = require('http'),
	port = require('./config.json').port,
	express = require('express'),
    path = require('path');



var app = express();  
app.set('port', port);

//app.use(app.router);
app.use('/',express.static(path.join(__dirname, '/public')));
//app.use('/static', express.static(__dirname + '/public'));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Server started on port ' + port);
});