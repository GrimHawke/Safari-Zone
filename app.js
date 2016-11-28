var express = require('express');
var app = express();

var router = require('./routing/routes.js');

app.use(express.static('public'));
app.use('/api', router)

var server = app.listen(3000, function() {
	var port = server.address().port;
	console.log("Started server at port", port);
});
