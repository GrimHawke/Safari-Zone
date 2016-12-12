var Sidebar = React.createClass({
  render: function(){
    return(
      <div className="col-xs-3 game-item" style={{borderLeft:'2px solid black', paddingLeft:'10px'}}>
        <div style={{height:'420px'}}>
          <div style={{textAlign:'center', margin:'10px'}}>
            <b>Score: </b>
            {this.props.score}
          </div>
          <div style={{textAlign:'center', margin:'10px'}}>
            <b>Encounters Remaining: </b>
            {this.props.turns}/20
          </div>
          <div style={{textAlign:'center', margin:'10px'}}>
            <b>Pokeballs Remaining: </b>
            {this.props.balls}/10
          </div>
          <div>
            <b>Pokemon Caught:</b>
            <PokemonCaught pokemon={this.props.pokemon}/>
          </div>
        </div>
        <div>
          <hr />
          <div>Use the WASD keys to move around the map and select options!</div>
          <div>Wait at your current location by hitting the SPACE BAR and select an option using the ENTER key!</div>
        </div>
      </div>
    );
  }
});

var PokemonCaught = React.createClass({
  getDefaultProps: function() {
    return ({
      "pokemon":[]
    });
  },

  render: function(){
    var pokemon = this.props.pokemon;
    var rows = [];
    for (var i in pokemon) {
      var columns = [];
      var path = "/pictures/" + pokemon[i].pokemon + ".gif";
      var name = pokemon[i].pokemon.charAt(0).toUpperCase() + pokemon[i].pokemon.slice(1);
      columns.push(<td><img className="tinypoke" src={path}/></td>);
      columns.push(<td><b>{name}</b></td>);
      rows.push(<tr>{columns}</tr>);
    }
    return (<table className="caught">{rows}</table>);
  }
});

var Map = React.createClass({
  keyPressed: function(event){
    const x = this.props.getX();
    const y = this.props.getY();
    if(event.key == " "){
      this.props.changeState(0);
    }
    else if(event.key == "w"){
      this.props.setPosition("up");
      if(y!=0 && this.returnTile(x,y-1) != 'blue' && this.returnTile(x,y-1) != 'royalblue'){
        this.props.changeTile(this.returnTile(x, y-1));
        this.props.setNearOcean(this.nearOcean(x, y-1));
        this.props.setY(y-1);
      }
    }
    else if(event.key == "s"){
      this.props.setPosition("down");
      if(y!=17 && this.returnTile(x,y+1) != 'blue' && this.returnTile(x,y+1) != 'royalblue'){
        this.props.changeTile(this.returnTile(x, y+1));
        this.props.setNearOcean(this.nearOcean(x, y+1));
        this.props.setY(y+1);
      }
    }
    else if(event.key == "a"){
      this.props.setPosition("left");
      if(x!=0 && this.returnTile(x-1,y) != 'blue' && this.returnTile(x-1,y) != 'royalblue'){
        this.props.changeTile(this.returnTile(x-1,y));
        this.props.setNearOcean(this.nearOcean(x-1,y));
        this.props.setX(x-1);
      }
    }
    else if(event.key == "d"){
      this.props.setPosition("right");
      if(x!=23 && this.returnTile(x+1,y) != 'blue' && this.returnTile(x+1,y) != 'royalblue'){
        this.props.changeTile(this.returnTile(x+1,y));
        this.props.setNearOcean(this.nearOcean(x+1,y));
        this.props.setX(x+1);
      }
    }
  },

  componentDidMount(){
    this.refs.toHaveFocus.focus();
  },

  redname: function() {
    return "pictures/red" + this.props.getPosition() + ".png";
  },

  render: function() {
    this.height = 18;
    this.width = 24;
    var rows = [];
    for(var i = 0; i < this.height; i++) {
      var columns = [];
      for(var j=0; j < this.width; j++) {
        var classstring = "row" + i + " column" + j;
        if(this.props.getY()==i && this.props.getX()==j) {
          columns.push(<td className={classstring} style={{backgroundColor:this.returnTile(j, i)}}><img src={this.redname()}/></td>);
        }
        else {
          columns.push(<td className={classstring} style={{backgroundColor:this.returnTile(j, i)}}></td>);
        }
      }
      rows.push(<tr>{columns}</tr>);
    }
    return (<table className="bird" tabIndex="0" ref="toHaveFocus" onKeyDown={this.keyPressed}>{rows}</table>);
  },

  returnTile: function(x, y) {
    if (y==9 || y > 9 && x == Math.round(this.height/2)+7) {
      return 'darkslategray';
    }
    else if (x==6 || x==7 || x>6 && (x+15-y) < 2 || y > this.height-3 && x > 4 && x < (Math.round(this.width/3)*2 + y - Math.round(this.width/2))) {
      return 'blue';
    }
    else if ((y+4)%7 < 5 && (x+2)%5 < 3 && (y+x)%9 < 4) {
      return 'darkgreen';
    }
    else if ((Math.round(y/2)*3+4)%12 > 8 && (x+2)%9 < 4 && (y*2+Math.round(x/3)*2+3)%9 < 7) {
      return 'royalblue';
    }
    else if ((y*3-y^2+5)%10 < 7 && (x*2+3)%9 < 7 && (y*2+x)%10 < 7) {
      return 'green';
    }
    else if((y*4-y^2+4)%13 < 9 && (x*2+3)%10 < 8 && (y*2+x+5)%10 < 7) {
      return 'saddlebrown';
    }
    else {
      return 'sandybrown';
    }
  },

  nearOcean: function(x, y) {
    if (x>=3 && x<=10 || x>6 && (x+15-y) < 2 || y > this.height-6 && x >= 2 && x < (Math.round(this.width/3)*2 + y - Math.round(this.width/2)) + 5) {
      return 1;
    }
    return 0;
  }

});

var BattleBoy = React.createClass({
  getInitialState: function() {
    return({
      pokemon: "missingno",
      rarity: 0,
      caught: 0
    })
  },

  componentWillMount: function() {
    const a = this;
    var apicall = '/api/generate/' + this.props.getTile() + '/' + this.props.getNearOcean();
    axios.get(apicall).then(function(value){
      a.setState({
        pokemon: value.data.name,
        rarity: value.data.rarity
      });
    });
  },

  pokemonFileName: function() {
    return "pictures/" + this.state.pokemon + ".png";
  },

  changeStateDummy: function(){
    this.props.changeState(1);
  },

  changeStateAndCatch: function(){
    this.setState({caught: 1}, () => {this.props.changeState(1);});
  },

  componentWillUnmount: function() {
    this.props.updateScore(this.state.rarity*this.state.caught);
    if(this.state.caught) {
      this.props.addPokemon({pokemon: this.state.pokemon, rarity: this.state.rarity});
      this.props.updateBalls();
    }
    else{
      this.props.updateTurns();
    }
  },

  render: function() {
    var backgroundstring = 'url(pictures/' + this.props.getTile() + ".png)"
    return(<table className="game" style={{backgroundImage:backgroundstring}}>
      <tr>
        <td>
        </td>
        <td>
          <img className="pokemon" src= {this.pokemonFileName()} ></img>
        </td>
      </tr>
      <tr>
        <td>
          <img className="boy" src="pictures/pokemonboy.png"></img>
        </td>
        <td>
        </td>
      </tr>
      <tr className="ui">
        <td onClick={this.changeStateAndCatch}>
          BALL
        </td>
        <td onClick={this.changeStateDummy}>
          RUN
        </td>
      </tr>
    </table>);
    /**
    <tr className="ui">
      <td>
        ROCK
      </td>
      <td onClick={this.changeStateDummy}>
        RUN
      </td>
    </tr>
    **/
  }
});

var GameOver = React.createClass({
  getInitialState: function(){
    return({playerscores: {}});
  },

  componentWillMount: function() {
    const a = this;
    var apicall = '/api/scores/' + this.props.getName();
    axios.get(apicall).then(function(value){
      a.setState({
        playerscores: value.data
      });
    });
  },

  render: function() {
    var name = this.props.getName();
    var playerscores = this.state.playerscores;
    var rows = [];
    rows.push(
      <tr>
        <th>Score</th>
        <th>Date</th>
      </tr>
    );
    for (var i in playerscores) {
      var columns = [];
      var date = JSON.stringify(new Date(playerscores[i].date));
      date = date.substring(1,11) + ", " + date.substring(12,17) + " UTC";
      columns.push(<td>{playerscores[i].score} points</td>);
      columns.push(<td>{date}</td>);
      rows.push(<tr>{columns}</tr>);
    }

    return (
      <div className="gameover">
        <div className="title">
          Game Over!
        </div>
        <div className="title">
          {name} Recent Scores
        </div>
        <div style={{margin: '20px 0px 20px 0px'}}>
        </div>
        <div>
          <table className="highscore" style={{marginLeft: "auto", marginRight: "auto"}}>
            {rows}
          </table>
        </div>
        <div className="button" style={{cursor:'pointer', margin: 'auto'}} onClick={this.toMainMenu}>
          To Main Screen
        </div>
      </div>
    );
  },

  toMainMenu: function() {
    this.props.resetScore();
    this.props.changeState(3);
  }
});

var HighScoreScreen = React.createClass({
  getInitialState: function(){
    return({highscores:[{name: "Ash", score: 0, date: "???"}]});
  },

  componentWillMount: function() {
    const a = this;
    var apicall = '/api/scores'
    axios.get(apicall).then(function(value){
      a.setState({
        highscores: value.data
      });
    });
  },

  goBack: function(){
    this.props.changeState(3);
  },

  render: function(){
    var highscores = this.state.highscores;
    var rows = [];
    rows.push(
      <tr>
        <th>Name</th>
        <th>Score</th>
        <th>Date</th>
      </tr>
    );
    for (var i in highscores) {
      var columns = [];
      var date = JSON.stringify(new Date(highscores[i].date));
      date = date.substring(1,11) + ", " + date.substring(12,17) + " UTC";
      columns.push(<td>{highscores[i].name}</td>);
      columns.push(<td>{highscores[i].score} points</td>);
      columns.push(<td>{date}</td>);
      rows.push(<tr>{columns}</tr>);
    }
    return (
      <div className="highscorepage" style={{padding: "5px 8px 5px 8px"}}>
        <div className="title">
          HIGH SCORES
        </div>
        <div>
          <table className="highscore" style={{marginLeft: "auto", marginRight: "auto"}}>
            {rows}
          </table>
        </div>
        <div className="button" style={{cursor:'pointer', margin: 'auto'}} onClick={this.goBack}>
          To Main Screen
        </div>
      </div>
    );
  }

});

var NewGameScreen = React.createClass({
  toMap: function(){
    this.props.changeState(1);
  },

  toHighScores: function(){
    this.props.changeState(4);
  },

  toAllPlayers: function(){
    this.props.changeState(5);
  },

  componentDidMount(){
    $('#name_field').val(this.props.getName());
  },

  componentWillUnmount(){
    this.props.changeName($('#name_field').val());
  },

  render: function() {
    var message = "";
    message = (
      <table>
        <tr>
          <td>
            <img src="/pictures/sideimage.png"/>
          </td>
          <td>
            <div style={{textAlign:'center', padding:'10px 0px 10px 0px'}}>
              Welcome to the Safari Zone! Please enter your name.
            </div>
            <div>
              <label>
                Name:&nbsp;&nbsp;
                <input id="name_field" type="text" name="name" style={{width:'310px'}}/>
              </label>
            </div>
            <div className="button" style={{margin:'0px 0px 35px 0px'}} onClick={this.toMap}>
              Here we go!
            </div>
            <div className="button" style={{margin:'2px 0px 4px 0px'}} onClick={this.toHighScores}>
              High Scores
            </div>
            <div className="button" style={{margin:'2px 0px 4px 0px'}} onClick={this.toAllPlayers}>
              View All Players
            </div>
            <div style={{margin:'2px 0px 4px 0px', padding:'10px 0px 10px 0px'}}>

            </div>
          </td>
        </tr>
      </table>
    );

    return(
      <div>
        {message}
      </div>
    );
  }
});

var AllPlayers = React.createClass({
  getInitialState: function(){
    return({players:{}});
  },

  componentWillMount: function() {
    const a = this;
    var apicall = '/api/players'
    axios.get(apicall).then(function(value){
      a.setState({
        players: value.data
      });
    });
  },

  goBack: function(){
    this.props.changeState(3);
  },

  render: function(){
    var players = this.state.players;
    var playerArr = [];
    for(var i in players){
      playerArr.push(players[i]);
    }
    return(
      <div>
        <div>
          {playerArr}
        </div>
        <div className="button" style={{cursor:'pointer', margin: 'auto'}} onClick={this.goBack}>
          To Main Screen
        </div>
      </div>
    )
  }
});

var GameScreen = React.createClass({
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
      "pokemon": []
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
  },

  addPokemon: function(pokemon) {
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
    return {gameState: 3};
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
      this.changeState(2);
    }
    this.updateTurns();
  },

  updateTurns: function() {
    this.props.turns -= 1;
    if (this.props.turns <= 0) {
      const name = this.props.name;
      const score = this.props.score;
      axios.post('/api/scores/' + name + '/' + score);
      this.changeState(2);
    }
  },

  updateScore: function(amount) {
    this.props.score += amount;
    this.forceUpdate();
  },

  render: function(){
    var message = "";
    if (this.state.gameState == 0){
      message = (
        <div className="col-xs-9 game-item">
          <BattleBoy updateScore={this.updateScore} updateTurns={this.updateTurns} updateBalls={this.updateBalls} changeState={this.changeState} getTile={this.getTile} getNearOcean={this.getNearOcean} addPokemon={this.addPokemon}/>
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
    else if (this.state.gameState == 2) {
      message = (
        <div className="col-xs-9 game-item">
          <GameOver changeState={this.changeState} getName={this.getName} resetScore={this.resetScore}/>
        </div>
      )
    }
    else if (this.state.gameState == 3) {
      message = (
        <div className="col-xs-9 game-item">
          <NewGameScreen changeState={this.changeState} getName={this.getName} changeName={this.changeName}/>
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

ReactDOM.render(<GameScreen />, document.getElementById('game'));
