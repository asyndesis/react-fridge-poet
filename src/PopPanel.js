import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class PopButton extends Component {

  componentWillUnmount() {
    this.isCancelled = true;
  }
  componentDidUpdate(){

  }
  render() {
      return (
        <div className="pop-panel">
          <div className="pop-panel-inside">
            {this.props.children}
          </div>
        </div>
      );
  }
}

export default PopButton;