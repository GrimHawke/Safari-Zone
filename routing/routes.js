var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var myCollection;

router.get('/', function(req, res){
	res.send('Welcome to the Safari Zone API!');
});

router.get('/generate', function(req, res){
  //Currently generates a random number between 0 and 9
  //Will need a lookup table to find which Pokemon this is
  var rand = Math.floor(Math.random()*10);
  res.json({pokemon: rand});
});

router.get('/players', function(req, res){
  //Should return a list of all players who have registered scores
	var db = MongoClient.connect('mongodb://test1:test1@ds113628.mlab.com:13628/safarizonedb', function(err, db) {
		if(err) { return console.dir(err); }
		var myCollection = db.collection('scores');
		myCollection.distinct("name").then(function(result){
			res.send(result);
		});

	});
});

router.get('/scores', function(req, res){
  //Should return a list of the highest or most recent scores in the game
	var db = MongoClient.connect('mongodb://test1:test1@ds113628.mlab.com:13628/safarizonedb', function(err, db) {
		if(err) { return console.dir(err); }
		var myCollection = db.collection('scores');
		myCollection.find({}, {"name": 1, "score": 1}).sort({score: -1}).limit(10).toArray(function(err, items){
			if(err) throw err;
			else res.send(items);
		});
	});
});

router.get('/scores/:id', function(req, res){
  //Currently does nothing
  //Should return a list all scores acheived by a specified player
  var player = req.params.id;
	var db = MongoClient.connect('mongodb://test1:test1@ds113628.mlab.com:13628/safarizonedb', function(err, db) {
	    if(err) { return console.dir(err); }

	    var myCollection = db.collection('scores');

	    myCollection.find({"name" : player}).toArray(function(err,items) {
				if (err) throw err;
				else res.send(items);
			});
		});
});

router.post('/scores/:id/:score', function(req, res){
  //Currently does nothing
  //Should update scores for a specified player based on what is contained in the request body;
  var myscore = req.params.score;
  var myplayer = req.params.id;
	var mydate = new Date().getTime()/100;


	var db = MongoClient.connect('mongodb://test1:test1@ds113628.mlab.com:13628/safarizonedb', function(err, db) {
	    if(err) { return console.dir(err); }

			var myCollection = db.collection('scores');

			myCollection.insert({name: myplayer, score: myscore, date: mydate}, function(err, result) {
				if(err) throw err;
			});
		});
  res.status(200).send('Scores updated.');
});

module.exports = router;
