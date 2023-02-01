import React from "react";
import { Socket } from "./Socket";
import { view } from "@risingstack/react-easy-state";
import appStore from "./appStore";
import { Link } from "react-router-dom";
import CheckSwitch from "./CheckSwitch";

class Rooms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasRoomOptions: false,
      roomName: "",
      roomUrl: "",
      maxUsers: "",
      checkedTypes: new Map(),
    };
    this.socket = Socket;

    this.socket.on("RECEIVE_ROOM_OPTIONS", function (data) {
      populateRoomTypes(data);
    });

    this.socket.on("ROOM_CREATED", function (data) {
      navigateToRoom(data.room);
    });

    const navigateToRoom = (room) => {
      this.props.history.push("/room/" + room);
    };

    const populateRoomTypes = (data) => {
      appStore.roomTypes = data.roomTypes;
      !this.isCancelled && this.setState({ hasRoomOptions: true });
    };

    const mapToObject = (aMap) => {
      const obj = {};
      aMap.forEach((v, k) => {
        obj[k] = v;
      });
      return obj;
    };

    this.changeRoomName = (e) => {
      let roomUrl = e.target.value
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
        .toLowerCase()
        .replace(/^-/, "");
      if (roomUrl[roomUrl.length - 1] === "-") {
        roomUrl = roomUrl.substring(0, roomUrl.length - 1);
      }
      this.refs.roomName.value = e.target.value;
      this.refs.roomUrl.value = roomUrl;
      this.setState({
        roomName: this.refs.roomName.value,
        roomUrl: this.refs.roomUrl.value,
      });
    };

    this.handleCheck = (e) => {
      const item = e.target.name;
      const isChecked = e.target.checked;
      this.setState((prevState) => ({
        checkedTypes: prevState.checkedTypes.set(item, isChecked),
      }));
    };

    this.createRoom = (e) => {
      let objMap = mapToObject(this.state.checkedTypes);
      this.socket.emit("CREATE_ROOM", {
        roomName: this.state.roomName,
        roomUrl: this.state.roomUrl,
        maxUsers: this.state.maxUsers,
        checkedTypes: objMap,
      });
    };

    this.socket.emit("GET_ROOM_OPTIONS");
  }
  componentWillUnmount() {
    this.isCancelled = true;
  }
  render() {
    return (
      <div className="container pad-top">
        <div
          className="card text-white bg-dark"
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <div className="card-header">
            <Link className="btn btn-danger float-right" to="/room">
              <i className="fa fa-close"></i> Cancel
            </Link>
            <h4>Create Room</h4>
          </div>
          <div className="card-body">
            <div
              style={{ display: this.state.hasRoomOptions ? "none" : "flex" }}
              className="loading"
            >
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div
              style={{ display: this.state.hasRoomOptions ? "block" : "none" }}
              className="rooms list-group"
            >
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label>Room Name</label>
                    <input
                      ref="roomName"
                      type="text"
                      placeholder="Room Name"
                      onChange={this.changeRoomName}
                      className="form-control form-control-lg"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label>Max Users</label>
                    <input
                      type="text"
                      placeholder="1-10"
                      min="1"
                      max="10"
                      step="1"
                      value={this.state.maxUsers}
                      onChange={(e) =>
                        this.setState({ maxUsers: e.target.value })
                      }
                      className="form-control form-control-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Room URL</label>
                <input
                  ref="roomUrl"
                  type="text"
                  placeholder="Room URL"
                  disabled
                  className="form-control form-control-lg"
                />
              </div>
              <label>Magnet Kits</label>
              <div className="card" style={{ marginBottom: "15px" }}>
                <div className="list-group">
                  {appStore.roomTypes.map((roomType) => {
                    return (
                      <div
                        className="list-group-item list-group-item-dark list-group-item-action d-flex justify-content-between align-items-center"
                        key={roomType}
                      >
                        <h5 className="titlecase mb-0">{roomType}</h5>
                        <CheckSwitch
                          name={roomType}
                          checked={this.state.checkedTypes.get(roomType)}
                          onChange={this.handleCheck}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <button
              className="btn btn-lg btn-success btn-block"
              onClick={this.createRoom}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default view(Rooms);
