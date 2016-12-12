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
    this.props.changeState(0);
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
