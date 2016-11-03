var Sidebar = React.createClass({
  render: function(){
    return(
      <div className ="col-xs-3 game-item">
        This is the sidebar
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
