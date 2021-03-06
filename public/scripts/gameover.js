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


  toMainMenu: function() {
    this.props.resetScore();
    this.props.changeState(0);
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
      <div>
        <div className="title">
          Game Over!
        </div>
        <div className="title2">
          {name} Recent Scores
        </div>
        <table className="scoretable">
          {rows}
        </table>
        <div className="button" style={{cursor:'pointer', margin: 'auto'}} onClick={this.toMainMenu}>
          To Main Screen
        </div>
      </div>
    );
  }
});
