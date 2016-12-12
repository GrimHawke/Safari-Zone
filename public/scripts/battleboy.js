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
