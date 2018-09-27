import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { view } from 'react-easy-state';
import appStore from './appStore';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: appStore.userName,
    };

    this.handleLogin = e => {
      if (this.state.userName.length > 1) {
        appStore.setUserName(this.state.userName);
      } else {
        e.preventDefault();
      }
    }
  }
  render() {
    return (

      <div className="container pad-top">
        <div className="card">
          <div className="card-header">
            Login
        </div>

          <div className="card-body">
            <div className="form-group">
              <input type="text" placeholder="username" value={this.state.userName} onChange={e => this.setState({ userName: e.target.value })} className="form-control form-control-lg" />
            </div>
            <Link onClick={this.handleLogin} className="btn btn-lg btn-primary btn-block" to='/room'>Rooms List</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default view(Login);