var Sidebar = React.createClass({
  render: function(){
    return(
      <div className="col-xs-3 game-item" style={{borderLeft:'2px solid black', paddingLeft:'10px'}}>
        <div style={{height:'350px'}}>
          <div style={{textAlign:'center', margin:'10px'}}>656 Actions Remaining</div>
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
  render: function() {
    var rows = [];
    var height = 29;
    var width = 37;
    for(var i = 0; i < height; i++) {
      var columns = [];
      for(var j=0; j < width; j++) {
        var classstring = "row" + i + " column" + j;
        var classcolor = "";
        if (i==9 || i > 9 && j == Math.round(height/2)+7) {
          columns.push(<td className={classstring} style={{backgroundColor:'darkslategray'}}></td>);
        } else if(j==6|| j==7 || j>6 && (j+15-i) < 2 || i > height-3 && j > 4 && j < (Math.round(width/3)*2 + i - Math.round(width/2))) {
          columns.push(<td className={classstring} style={{backgroundColor:'blue'}}></td>);
        } else if((i+4)%7 < 5 && (j+2)%5 < 3 && (i+j)%9 < 4) {
          columns.push(<td className={classstring} style={{backgroundColor:'darkgreen'}}></td>);
        } else if((Math.round(i/2)*3+4)%12 > 8 && (j+2)%9 < 4 && (i*2+Math.round(j/3)*2+3)%9 < 7) {
          columns.push(<td className={classstring} style={{backgroundColor:'royalblue'}}></td>);
        } else if((i*3-i^2+5)%10 < 7 && (j*2+3)%9 < 7 && (i*2+j)%10 < 7) {
          columns.push(<td className={classstring} style={{backgroundColor:'green'}}></td>);
        } else if((i*4-i^2+4)%13 < 9 && (j*2+3)%10 < 8 && (i*2+j+5)%10 < 7) {
          columns.push(<td className={classstring} style={{backgroundColor:'saddlebrown'}}></td>);
        } else {
          columns.push(<td className={classstring} style={{backgroundColor:'sandybrown'}}></td>);
        }
      }
      rows.push(<tr>{columns}</tr>);
    }
    return (<table className="bird">{rows}</table>);
  }
});

var BattleBoy = React.createClass({
  render: function() {
    return(<table className="gaem" style={{backgroundImage:'url(pictures/backgroundboy.png)'}}>
      <tr>
        <td>
        </td>
        <td>
          <img className="pokemon" src="pictures/pikachu.png"></img>
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
        <td>
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
        <td>
          RUN
        </td>
      </tr>
    </table>);
  }
});

var GameScreen = React.createClass({
  getInitialState: function(){
    return{gameState: 0}
  },

  stateChange: function(){
    this.setState({
      gameState: (this.state.gameState + 1)%2
    })
  },

  render: function(){
    var message = "";
    if (this.state.gameState == 0){
      message = (
        <div className="col-xs-9 game-item" onClick={this.stateChange}>
          <BattleBoy />
        </div>
      )
    }
    else{
      message = (
        <div className="col-xs-9 game-item" onClick={this.stateChange}>
          <Map />
        </div>
      )
    }
    return(
      <div className="row">
        {message}
        <Sidebar />
      </div>
    );
  }
});

ReactDOM.render(<GameScreen />, document.getElementById('game'));
