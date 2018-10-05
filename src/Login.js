import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { view } from 'react-easy-state';
import appStore from './appStore';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: appStore.userName,
      userColor: appStore.userColor
    };

    this.handleLogin = e => {
      if (this.state.userName.length > 1 && this.state.userColor.length > 1) {
        appStore.setUserName(this.state.userName);
        appStore.setUserColor(this.state.userColor);
      } else {
        e.preventDefault();
      }
    }

  }
  render() {
    return (

      <div className="container pad-top">
        <div className="card text-white bg-dark" style={{maxWidth:'400px',margin:'0 auto'}}>
          <div className="card-header">
            <h4>Fridge Poet</h4>
          </div>

          <div className="card-body">
            <div className="form-group">
              <label>Alias</label>
              <input type="text" placeholder="Alias" value={this.state.userName} onChange={e => this.setState({ userName: e.target.value })} className="form-control form-control-lg" />
            </div>
            <div className="form-group">
              <label>Favorite Color</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <div className="color-swatch" style={{backgroundColor:this.state.userColor}}></div>
                  </span>
                </div>
                <input type="text" placeholder="Favorite Color" value={this.state.userColor} onChange={e => this.setState({ userColor: e.target.value })} className="form-control form-control-lg" />
              </div>
            </div>
            <Link onClick={this.handleLogin} className="btn btn-lg btn-primary btn-block" to='/room'>Rooms List</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default view(Login);