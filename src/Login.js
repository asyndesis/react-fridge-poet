import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class Login extends Component {

  render() {
    return (

      <div className="container pad-top">
            <div className="card">
                <div className="card-body">
                    <div className="card-title">Login will go here...</div>
                    <hr/>
                    <Link className="btn btn-lg btn-primary btn-block" to='/room'>Rooms List</Link>
                </div>
            </div>
        </div>
    );
  }
}

export default Login;