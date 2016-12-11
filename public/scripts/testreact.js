var Sidebar = React.createClass({
  render: function(){
    return(
      <div className="col-xs-3 game-item" style={{borderLeft:'2px solid black', paddingLeft:'10px'}}>
        <div style={{height:'350px'}}>
          <div style={{textAlign:'center', margin:'10px'}}><b>Score:</b> {this.props.score}</div>
          <div>
            <b>Pokemon Caught:</b>
            <div>lol there are no sprites for this yet</div>
            <div>but there will be sprites here</div>
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

var Map = React.createClass({
  keyPressed: function(event){
    const x = this.props.getX();
    const y = this.props.getY();
    if(event.key == " "){
      this.props.changeState();
    }
    else if(event.key == "w"){
      if(y!=0 && this.returnTile(x,y-1) != 'blue' && this.returnTile(x,y-1) != 'royalblue'){this.props.setY(y-1);}
    }
    else if(event.key == "s"){
      if(y!=17 && this.returnTile(x,y+1) != 'blue' && this.returnTile(x,y+1) != 'royalblue'){this.props.setY(y+1);}
    }
    else if(event.key == "a"){
      if(x!=0 && this.returnTile(x-1,y) != 'blue' && this.returnTile(x-1,y) != 'royalblue'){this.props.setX(x-1);}
    }
    else if(event.key == "d"){
      if(x!=23 && this.returnTile(x+1,y) != 'blue' && this.returnTile(x+1,y) != 'royalblue'){this.props.setX(x+1);}
    }
  },

  render: function() {
    this.height = 18;
    this.width = 24;
    var rows = [];
    for(var i = 0; i < this.height; i++) {
      var columns = [];
      for(var j=0; j < this.width; j++) {
        var classstring = "row" + i + " column" + j;
        var classcolor = "";
        if(this.props.getY()==i && this.props.getX()==j) {
          columns.push(<td className={classstring} style={{backgroundColor:this.returnTile(j, i)}}><img src="pictures/redow.png"/></td>);
        }
        else {
          columns.push(<td className={classstring} style={{backgroundColor:this.returnTile(j, i)}}></td>);
        }
      }
      rows.push(<tr>{columns}</tr>);
    }
    return (<table className="bird" tabIndex="0" onKeyDown={this.keyPressed}>{rows}</table>);
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
      return true;
    }
    return false;
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
    axios.get('/api/generate').then(function(value){
      a.setState({
        pokemon: value.data.name,
        rarity: value.data.rarity
      });
      return value.data;
    });
  },

  pokemonFileName: function() {
    return "pictures/" + this.state.pokemon + ".png";
  },

  changeStateAndCatch: function(){
    this.setState({caught: 1}, () => {this.props.changeState();});
  },

  componentWillUnmount: function() {
    this.props.updateScore(this.state.rarity*this.state.caught);
    this.props.updateTurns();
  },

  render: function() {
    return(<table className="game" style={{backgroundImage:'url(pictures/backgroundboy.png)'}}>
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
        <td>
          BAIT
        </td>
      </tr>
      <tr className="ui">
        <td>
          ROCK
        </td>
        <td onClick={this.props.changeState}>
          RUN
        </td>
      </tr>
    </table>);
  }
});

var GameScreen = React.createClass({
  getDefaultProps: function() {
    return({
      "score": 0,
      "turns": 10,
      "xloc": 10,
      "yloc": 10
    });
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
    return{gameState: 1}
  },

  changeState: function(){
    this.setState({
      gameState: (this.state.gameState + 1)%2
    })
  },

  updateTurns: function() {
    this.props.turns -= 1;
    if (this.props.turns < 0) {
      this.setState({gameState:2})
      const name = "ABC";
      const score = this.props.score;
      axios.post('/api/scores/' + name + '/' + score);
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
          <BattleBoy updateScore={this.updateScore} updateTurns={this.updateTurns} changeState={this.changeState} />
        </div>
      )
    }
    else if (this.state.gameState == 1){
      message = (
        <div className="col-xs-9 game-item">
          <Map changeState={this.changeState} getX={this.getX} getY={this.getY} setX={this.setX} setY={this.setY}/>
        </div>
      )
    }
    else {
      message = (
        <div className="col-xs-9 game-item">
          <Map />
        </div>
      )
    }
    return(
      <div className="row">
        {message}
        <Sidebar score={this.props.score}/>
      </div>
    );
  }
});

ReactDOM.render(<GameScreen />, document.getElementById('game'));
