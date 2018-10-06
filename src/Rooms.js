import React from "react";
import { Socket } from "./Socket";
import { view } from 'react-easy-state';
import { Link } from 'react-router-dom';
import appStore from './appStore';

class Rooms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasRooms: false
    }
    this.socket = Socket;

    this.socket.on('RECEIVE_ROOMS', function (data) {
      populateRooms(data);
    });

    const populateRooms = data => {
      appStore.rooms = data;
      !this.isCancelled && this.setState({ hasRooms: true });
    };


    this.socket.emit('JOIN_LOBBY', {
      userName: appStore.userName,
      userColor: appStore.userColor
    });

  }
  componentWillUnmount() {
    this.isCancelled = true;
  }
  render() {
    return (
      <div className="container pad-top">
        <div className="card text-white bg-dark" style={{maxWidth:'600px',margin:'0 auto'}}>
          <div className="card-header">
            <Link className="btn btn-success float-right" to="/create-room"><i className="fa fa-plus"></i> Create Room</Link>
            <h4>Rooms List</h4>
          </div>
          <div className="card-body">
            <div style={{ display: (this.state.hasRooms ? 'none' : 'flex') }} className="loading">
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
            <div className="card">
              <div style={{ display: (this.state.hasRooms ? 'block' : 'none') }} className="rooms list-group">
                {appStore.rooms.map(room => {
                  if (room.id !== 'lobby'){
                    return (
                      <Link key={room.id} to={`/room/${room.id}`} className="list-group-item list-group-item-dark list-group-item-action d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">{room.name}</h5>
                        <span className="badge badge-pill badge-dark">{room.users.length} users</span>
                      </Link>
                    )
                  }else{
                    return false;
                  }
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default view(Rooms)