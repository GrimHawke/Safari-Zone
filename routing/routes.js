var express = require('express');
var router = express.Router();

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
  //Currently does nothing
  //Should return a list of all players who have registered scores
});

router.get('/scores', function(req, res){
  //Currently does nothing
  //Should return a list of the highest or most recent scores in the game
});

router.get('/scores/:id', function(req, res){
  //Currently does nothing
  //Should return a list all scores acheived by a specified player
  var player = req.params.id;
});

router.post('/scores/:id', function(req, res){
  //Currently does nothing
  //Should update scores for a specified player based on what is contained in the request body;
  var score = req.body;
  var player = req.params.id;
  res.status(200).send('Scores updated.');
});

module.exports = router;
