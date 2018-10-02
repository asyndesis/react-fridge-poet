import React, { Component } from 'react';
class PopButton extends Component {

  componentWillUnmount() {
    this.isCancelled = true;
  }
  componentDidUpdate(){

  }
  render() {
      return (
        <div className={"pop-panel "+this.props.active} style={this.props.style}>
          <div className="pop-panel-inside">
            {this.props.children}
          </div>
        </div>
      );
  }
}

export default PopButton;