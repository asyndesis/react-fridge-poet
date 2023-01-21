import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Rooms from "./Rooms";
import CreateRoom from "./CreateRoom";
import Fridge from "./Fridge";
import Login from "./Login";
import SweetAlert from "sweetalert2-react";
import { Socket } from "./Socket";
import Chat from "./Chat";
import PopPanel from "./PopPanel";
import PopButton from "./PopButton";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasStatus: false,
      statusTitle: "warning",
      statusMessage: "",
    };

    this.socket = Socket;

    this.socket.on("SHOW_STATUS_MESSAGE", function (data) {
      showStatus(data);
    });

    const showStatus = (data) => {
      this.setState({
        hasStatus: true,
        statusTitle: data.type,
        statusMessage: data.message,
      });
    };

    this.handleSocketFound = (e) => {
      this.setState({
        socketFound: true,
      });
    };

    /* Ugly hack to disable pull down refresh */
    this.preventPullToRefresh = () => {
      document.addEventListener(
        "touchmove",
        function (e) {
          if (e.target.classList[0] === "magnet") {
            e.preventDefault();
          }
        },
        { passive: false }
      );
    };
  }
  componentDidMount() {
    window.addEventListener("socket_found", this.handleSocketFound);
    if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
      document.body.classList.add("is-android");
    }
    this.preventPullToRefresh();
  }
  componentWillUnmount() {
    window.removeEventListener("socket_found", this.handleSocketFound);
  }

  render() {
    if (!this.state.socketFound) {
      return (
        <div className="container pad-top">
          <div
            className="card text-white bg-dark"
            style={{ maxWidth: "400px", margin: "0 auto" }}
          >
            <div className="card-header">
              <h4>Spinning up server...</h4>
            </div>
            <div className="card-body">
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div style={{ lineHeight: 1 }}>
                  <div>Please be patient.</div>
                  <small
                    style={{ margin: 0, opacity: 0.5, fontStyle: "italic" }}
                  >
                    I am on the free-tier plan
                  </small>
                  <small> 🤣</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        <SweetAlert
          show={this.state.hasStatus}
          type={this.state.statusTitle}
          title={this.state.statusTitle}
          text={this.state.statusMessage}
          onConfirm={() => this.setState({ hasStatus: false })}
        />
        <PopPanel className="main-pop-panel">
          <Chat />
          <PopButton icon="fa fa-home" to="/room/lobby" />
          <PopButton icon="fa fa-cog" to="/" />
        </PopPanel>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/room" component={Rooms} />
          <Route exact path="/room/lobby" component={Rooms} />
          <Route exact path="/create-room" component={CreateRoom} />
          <Route path="/room/:room" component={Fridge} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
