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
