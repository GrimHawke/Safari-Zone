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
    this.props.changeState(0);
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
