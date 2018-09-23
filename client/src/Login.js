import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class Login extends Component {

  render() {
    return (
      <div>
          This will be login
          <Link to='/room'>Rooms List</Link>
      </div>
    );
  }
}

export default Login;