var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var myCollection;
var pokemonmap = {
	0: {name:"bulbasaur",rarity:30},
	1: {name:"charmander",rarity:30},
	2: {name:"squirtle",rarity:30},
	3: {name:"caterpie",rarity:10},
	4: {name:"pikachu",rarity:30},
	5: {name:"abra",rarity:50},
	6: {name:"bidoof",rarity:10},
	7: {name:"bronzor",rarity:80},
	8: {name:"dratini",rarity:80},
	9: {name:"foongus",rarity:20},
	10: {name:"gastly",rarity:50},
	11: {name:"gible",rarity:60},
	12: {name:"heracross",rarity:70},
	13: {name:"houndour",rarity:40},
	14: {name:"mawile",rarity:50},
	15: {name:"natu",rarity:40},
	16: {name:"rotom",rarity:80},
	17: {name:"sandile",rarity:30},
	18: {name:"scraggy",rarity:30},
	19: {name:"shuckle",rarity:60},
	20: {name:"snover",rarity:70},
	21: {name:"wingull",rarity:10}
};

router.get('/', function(req, res){
	res.send('Welcome to the Safari Zone API!');
});

router.get('/generate', function(req, res){
  //Currently generates a random number between 0 and 9
  //Will need a lookup table to find which Pokemon this is
  var rand = Math.floor(Math.random()*22);
  res.json(pokemonmap[rand]);
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
