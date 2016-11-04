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
          I am on the initial screen
        </div>
      )
    }
    else{
      message = (
        <div className="col-xs-9 game-item" onClick={this.stateChange}>
          You have brought me to the alternate screen
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
