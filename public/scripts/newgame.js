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
