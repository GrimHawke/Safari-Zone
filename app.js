var express = require('express');

var app = express();

app.use(express.static('public'));

//var routes = require('./routing/routes'); //I have no clue about this syntax, try it another way
//app.use(routes);

var server = app.listen(3000, function() {
	var port = server.address().port;
	console.log("Started server at port", port);
});
