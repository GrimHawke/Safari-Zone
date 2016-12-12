var Map = React.createClass({
  keyPressed: function(event){
    const x = this.props.getX();
    const y = this.props.getY();
    if(event.key == " "){
      this.props.changeState(2);
    }
    else if(event.key == "w"){
      this.props.setPosition("up");
      if(y!=0 && this.returnTile(x,y-1) != 'blue' && this.returnTile(x,y-1) != 'royalblue'){
        this.props.changeTile(this.returnTile(x, y-1));
        this.props.setNearOcean(this.nearOcean(x, y-1));
        this.props.setY(y-1);
      }
    }
    else if(event.key == "s"){
      this.props.setPosition("down");
      if(y!=17 && this.returnTile(x,y+1) != 'blue' && this.returnTile(x,y+1) != 'royalblue'){
        this.props.changeTile(this.returnTile(x, y+1));
        this.props.setNearOcean(this.nearOcean(x, y+1));
        this.props.setY(y+1);
      }
    }
    else if(event.key == "a"){
      this.props.setPosition("left");
      if(x!=0 && this.returnTile(x-1,y) != 'blue' && this.returnTile(x-1,y) != 'royalblue'){
        this.props.changeTile(this.returnTile(x-1,y));
        this.props.setNearOcean(this.nearOcean(x-1,y));
        this.props.setX(x-1);
      }
    }
    else if(event.key == "d"){
      this.props.setPosition("right");
      if(x!=23 && this.returnTile(x+1,y) != 'blue' && this.returnTile(x+1,y) != 'royalblue'){
        this.props.changeTile(this.returnTile(x+1,y));
        this.props.setNearOcean(this.nearOcean(x+1,y));
        this.props.setX(x+1);
      }
    }
  },

  componentDidMount(){
    this.refs.toHaveFocus.focus();
  },

  redname: function() {
    return "pictures/red" + this.props.getPosition() + ".png";
  },

  render: function() {
    this.height = 18;
    this.width = 24;
    var rows = [];
    for(var i = 0; i < this.height; i++) {
      var columns = [];
      for(var j=0; j < this.width; j++) {
        var classstring = "row" + i + " column" + j;
        if(this.props.getY()==i && this.props.getX()==j) {
          columns.push(<td className={classstring} style={{backgroundColor:this.returnTile(j, i)}}><img src={this.redname()}/></td>);
        }
        else {
          columns.push(<td className={classstring} style={{backgroundColor:this.returnTile(j, i)}}></td>);
        }
      }
      rows.push(<tr>{columns}</tr>);
    }
    return (<table className="bird" tabIndex="0" ref="toHaveFocus" onKeyDown={this.keyPressed}>{rows}</table>);
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
      return 1;
    }
    return 0;
  }

});
