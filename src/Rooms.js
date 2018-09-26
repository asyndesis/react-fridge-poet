import React from "react";
import {Socket} from "./Socket";
import { view } from 'react-easy-state';
import { Link } from 'react-router-dom';
import appStore from './appStore';

class Rooms extends React.Component{
    constructor(props){
        super(props);

        this.socket = Socket;

        this.socket.on('RECEIVE_ROOMS', function(data){
            populateRooms(data);
        });

        const populateRooms = data => {
            appStore.rooms = data;
            !this.isCancelled && this.forceUpdate();
        };

        this.socket.emit('JOIN_LOBBY');

    }
    componentWillUnmount() {
        this.isCancelled = true;
    }
    render(){
        return (
            <div className="container pad-top">
            <div className="card">
                <div className="card-body">
                    <div className="card-title">Rooms List</div>
                    <hr/>
                    <div style={{display: (appStore.rooms.length > 0 ? 'none' : 'flex')}} className="loading">
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    </div>
                    <div className="rooms list-group">
                        {appStore.rooms.map(room => {
                            return (
                                <Link key={room.id} to={`/room/${room.id}`} className="list-group-item list-group-item-action">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{room.name}</h5>
                                        <small>{room.users} users</small>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>

                </div>
            </div>
            </div>
        );
    }
}

export default view(Rooms)