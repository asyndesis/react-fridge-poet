import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { view } from 'react-easy-state';
import appStore from './appStore';

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
        username: '',
    };

    this.handleLogin = e => {
        if (this.state.username.length > 1){
            appStore.username = this.state.username;
        }else{
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
                    <input type="text" placeholder="Username" value={this.state.username} onChange={e => this.setState({username: e.target.value})} className="form-control form-control-lg"/>
                    </div>
                    <Link onClick={this.handleLogin} className="btn btn-lg btn-primary btn-block" to='/room'>Rooms List</Link>
                </div>
            </div>
        </div>
    );
  }
}

export default view(Login);