import React from "react";

class Magnet extends React.Component{

  render(){
    return (
      <div
      className="magnet noselect "
      id={this.props.id}
      onMouseDown={this.props.onMouseDown}
      onMouseUp={this.props.onMouseUp}
      onTouchStart={this.props.onTouchStart}
      onTouchEnd={this.props.onTouchEnd}
      style={{zIndex: this.props.z, left: this.props.x+'px', top: this.props.y+'px',opacity: (this.props.selected ? '.5' : '1')}}>
        {this.props.children}
      </div>
    );
  }
}

export default Magnet;