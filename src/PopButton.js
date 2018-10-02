import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PopButton extends Component {

  componentWillUnmount() {
    this.isCancelled = true;
  }
  componentDidUpdate(){

  }
  render() {
    if (this.props.to){
      return (
        <div className={"pop-button "+this.props.className}>
          <Link className="pop-button-icon" to={this.props.to}>
            <i className={this.props.icon}></i>
            <span style={{display:(!this.props.alerts || this.props.alerts === 0 ? 'none': 'block')}} className="badge badge-danger">{this.props.alerts}</span>
          </Link>
          <div className="pop-button-action">
            {this.props.children}
          </div>
        </div>
      );
    }else{
      return (
        <div className={"pop-button "+this.props.className}>
          <div className="pop-button-icon" onClick={this.props.onClick}>
            <i className={this.props.icon}></i>
            <span style={{display:(this.props.alerts === 0 ? 'none': 'block')}} className="badge badge-danger">{this.props.alerts}</span>
          </div>
          <div className="pop-button-action">
            {this.props.children}
          </div>
        </div>
      );
    }


  }
}

export default PopButton;