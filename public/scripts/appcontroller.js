var AppController = React.createClass({
  getDefaultProps: function() {
    return({
      "score": 0,
      "turns": 20,
      "balls": 10,
      "xloc": 10,
      "yloc": 10,
      "tile": "darkgreen",
      "nearocean": 1,
      "position": "down",
      "name": "Ash",
      "pokemon": [],
      "mewchance": 0
    });
  },

  resetScore: function() {
    this.props.score = 0;
    this.props.turns = 20;
    this.props.balls = 10;
    this.props.xloc = 10;
    this.props.yloc = 10;
    this.props.tile = "darkgreen";
    this.props.nearocean = 1;
    this.props.position = "down";
    this.props.pokemon = [];
    this.props.mewchance = 0;
  },

  setMewChance: function(number) {
    this.props.mewchance = number;
  },

  getMewChance: function() {
    return this.props.mewchance;
  },

  addPokemon: function(pokemon) {
    var alreadycaught = false;
    for(var i in this.props.pokemon) {
      if(pokemon.name==this.props.pokemon[i].name) {
        alreadycaught = true;
      }
    }
    if (pokemon.name=="mew") {
      this.props.mewchance = 0;
    }
    else if (alreadycaught != true) {
      var apicall = '/api/mewpoke/' + pokemon.name;
      axios.get(apicall).then(function(value){
        this.setMewChance(this.props.mewchance+value);
        console.log(this.props.mewchance);
      })
    }
    this.props.pokemon.push(pokemon);
  },

  getName: function(){
    return this.props.name;
  },

  changeName: function(newname){
    this.props.name = newname;
  },

  setPosition: function(newposition) {
    this.props.position = newposition;
    this.forceUpdate();
  },

  getPosition: function() {
    return this.props.position;
  },

  setNearOcean: function(yesorno) {
    this.props.nearocean = yesorno;
  },

  getNearOcean: function() {
    return this.props.nearocean;
  },

  setX: function(newX) {
    this.props.xloc = newX;
    this.forceUpdate();
  },

  getX: function() {
    return this.props.xloc;
  },

  setY: function(newY){
    this.props.yloc = newY;
    this.forceUpdate();
  },

  getY: function() {
    return this.props.yloc;
  },

  getInitialState: function(){
    return {gameState: 0};
  },

  changeState: function(newState){
    this.setState({
      gameState: newState
    })
  },

  changeTile: function(color){
    this.props.tile = color;
  },

  getTile: function() {
    return this.props.tile;
  },

  updateBalls: function() {
    this.props.balls -= 1;
    if (this.props.balls <= 0) {
      const name = this.props.name;
      const score = this.props.score;
      axios.post('/api/scores/' + name + '/' + score);
      this.changeState(3);
    }
    this.updateTurns();
  },

  updateTurns: function() {
    this.props.turns -= 1;
    if (this.props.turns <= 0) {
      const name = this.props.name;
      const score = this.props.score;
      axios.post('/api/scores/' + name + '/' + score);
      this.changeState(3);
    }
  },

  updateScore: function(amount) {
    this.props.score += amount;
    this.forceUpdate();
  },

  render: function(){
    var message = "";
    if (this.state.gameState == 0) {
      message = (
        <div className="col-xs-9 game-item">
          <NewGameScreen changeState={this.changeState} getName={this.getName} changeName={this.changeName}/>
        </div>
      )
    }
    else if (this.state.gameState == 1){
      message = (
        <div className="col-xs-9 game-item">
          <Map changeState={this.changeState} getX={this.getX} getY={this.getY} setX={this.setX} setY={this.setY} changeTile={this.changeTile} setNearOcean={this.setNearOcean} setPosition={this.setPosition} getPosition={this.getPosition}/>
        </div>
      )
    }
    if (this.state.gameState == 2){
      message = (
        <div className="col-xs-9 game-item">
          <BattleBoy updateScore={this.updateScore} updateTurns={this.updateTurns} updateBalls={this.updateBalls} changeState={this.changeState} getTile={this.getTile} getNearOcean={this.getNearOcean} addPokemon={this.addPokemon} getMewChance={this.getMewChance}/>
        </div>
      )
    }
    else if (this.state.gameState == 3) {
      message = (
        <div className="col-xs-9 game-item">
          <GameOver changeState={this.changeState} getName={this.getName} resetScore={this.resetScore}/>
        </div>
      )
    }
    else if (this.state.gameState == 4){
      message = (
        <div className="col-xs-9 game-item">
          <HighScoreScreen changeState={this.changeState}/>
        </div>
      )
    }
    else if (this.state.gameState == 5){
      message = (
        <div className="col-xs-9 game-item">
          <AllPlayers changeState={this.changeState}/>
        </div>
      )
    }
    return(
      <div className="row">
        {message}
        <Sidebar score={this.props.score} turns={this.props.turns} balls={this.props.balls} pokemon={this.props.pokemon}/>
      </div>
    );
  }
});

ReactDOM.render(<AppController />, document.getElementById('game'));
