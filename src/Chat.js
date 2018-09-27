import React, { Component } from 'react';
import { view } from 'react-easy-state';
import appStore from './appStore';
import {Socket} from "./Socket";

class Chat extends Component {
  constructor(props){
    super(props);

    this.state = {
        users: [],
    };

    this.socket = Socket;
    this.socket.on('USER_JOINED', function(data){
        populateUsers(data);
    });

    const populateUsers = data => {
        !this.isCancelled && this.setState({users: data});
    };
  }
  render() {
    return (
        <div className="chat">
            {this.state.users.map(user => {
                return (
                    <div key={user.id}>{user.name}</div>
                )
            })}
        </div>

    );
  }
}

export default view(Chat);