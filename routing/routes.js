var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var myCollection;
var pokemon = {
	"abra": {rarity:60},
	"bidoof": {rarity:10},
	"bronzor": {rarity:80},
	"bulbasaur": {rarity:30},
	"caterpie": {rarity:10},
	"charmander": {rarity:30},
	"corsola": {rarity:70},
	"deino": {rarity:80},
	"dratini": {rarity:80},
	"duskull": {rarity:60},
	"foongus": {rarity:30},
	"gastly": {rarity:60},
	"gible": {rarity:60},
	"heracross": {rarity:70},
	"houndour": {rarity:40},
	"krabby": {rarity:40},
	"mawile": {rarity:50},
	"mew": {rarity:200},
	"natu": {rarity:30},
	"numel": {rarity:50},
	"pikachu": {rarity:30},
	"rattata": {rarity:10},
	"rotom": {rarity:80},
	"sandile": {rarity:40},
	"scraggy": {rarity:30},
	"shuckle": {rarity:80},
	"snover": {rarity:70},
	"squirtle": {rarity:30},
	"wingull": {rarity:30},
	"zubat": {rarity:10}
}
var map = {
	sandybrown: {
		0: {name:"gastly",rarity:60},
		1: {name:"sandile",rarity:40},
		2: {name:"scraggy",rarity:30},
		3: {name:"shuckle",rarity:80},
		4: {name:"rattata",rarity:10},
		5: {name:"numel",rarity:50},
		length: 6
	},
	darkgreen: {
		0: {name:"bulbasaur",rarity:30},
		1: {name:"caterpie",rarity:10},
		2: {name:"foongus",rarity:30},
		3: {name:"heracross",rarity:70},
		4: {name:"rotom", rarity:80},
		5: {name:"duskull", rarity:60},
		length: 6
	},
	green: {
		0: {name:"abra",rarity:50},
		1: {name:"bidoof",rarity:10},
		2: {name:"dratini",rarity:80},
		3: {name:"houndour",rarity:40},
		4: {name:"pikachu",rarity:30},
		length: 5
	},
	darkslategray: {
		0: {name:"abra",rarity:50},
		1: {name:"deino",rarity:80},
		2: {name:"gastly",rarity:60},
		3: {name:"natu",rarity:30},
		4: {name:"scraggy",rarity:30},
		5: {name:"squirtle",rarity:30},
		length: 6
	},
	saddlebrown: {
		0: {name:"bronzor",rarity:80},
		1: {name:"charmander",rarity:30},
		2: {name:"gible",rarity:60},
		3: {name:"mawile",rarity:50},
		4: {name:"snover",rarity:70},
		5: {name:"zubat",rarity:10},
		length: 6
	},
	ocean: {
		0: {name:"wingull",rarity:30},
		1: {name:"corsola",rarity:70},
		2: {name:"krabby",rarity:40},
		length: 3
	},
	special: {
		0: {name:"mew",rarity:200},
		length: 1
	},
	mewchance: {
		0: {name:"abra",rarity:1},
		1: {name:"bulbasaur",rarity:5},
		2: {name:"caterpie",rarity:3},
		3: {name:"charmander",rarity:5},
		4: {name:"dratini",rarity:1},
		5: {name:"gastly",rarity:5},
		6: {name:"krabby",rarity:2},
		7: {name:"pikachu",rarity:1},
		8: {name:"rattata",rarity:3},
		9: {name:"squirtle",rarity:5},
		10: {name:"zubat",rarity:3},
		length: 11
	}
}

router.get('/', function(req, res){
	res.send('Welcome to the Safari Zone API!');
});

router.get('/mewpoke/:name', function(req, res){
	for (var i=0; i<map.mewchance.length; i++) {
		if (map.mewchance[i].name == req.params.name) {
			res.json(map.mewchance[i].rarity);
			return;
		}
	}
	res.json(0);
});

router.get('/generate/:tile/:nearocean/:mewchance', function(req, res){
  //Currently generates a random number between 0 and 9
  //Will need a lookup table to find which Pokemon this i
	if (req.params.tile == "green") {
		var rand = Math.floor(Math.random()*30);
		if (rand <= req.params.mewchance) {
			res.json(map.special[0]);
			return;
		}
	}
  var rand = Math.floor(Math.random()*(map[req.params.tile].length+map['ocean'].length*req.params.nearocean));
	if (req.params.nearocean==1 && rand >= map[req.params.tile].length) {
		res.json(map['ocean'][rand-map[req.params.tile].length]);
	}
	else {
  	res.json(map[req.params.tile][rand]);
	}
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
  //Should return a list of the highest scores in the game
	var db = MongoClient.connect('mongodb://test1:test1@ds113628.mlab.com:13628/safarizonedb', function(err, db) {
		if(err) { return console.dir(err); }
		var myCollection = db.collection('scores');
		myCollection.find().sort({score: -1}).limit(10).toArray(function(err, items){
			if(err) throw err;
			else res.send(items);
		});
	});
});

router.get('/scores/:id', function(req, res){
  //Should return a list all scores acheived by a specified player
  var player = req.params.id;
	var db = MongoClient.connect('mongodb://test1:test1@ds113628.mlab.com:13628/safarizonedb', function(err, db) {
	    if(err) { return console.dir(err); }

	    var myCollection = db.collection('scores');

	    myCollection.find({"name" : player}).sort({date: -1}).limit(10).toArray(function(err,items) {
				if (err) throw err;
				else res.send(items);
			});
		});
});

router.post('/scores/:id/:score', function(req, res){
  //Should update scores for a specified player based on what is contained in the request body;
  var myscore = req.params.score;
  var myplayer = req.params.id;
	var mydate = new Date().getTime();


	var db = MongoClient.connect('mongodb://test1:test1@ds113628.mlab.com:13628/safarizonedb', function(err, db) {
	    if(err) { return console.dir(err); }

			var myCollection = db.collection('scores');

			myCollection.insert({name: myplayer, score: myscore, date: mydate}, {w: 1}, function(err, result) {
				if(err) throw err;
			});
		});
  res.status(200).send('Scores updated.');
});

module.exports = router;
