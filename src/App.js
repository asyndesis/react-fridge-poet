import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Rooms from "./Rooms";
import CreateRoom from "./CreateRoom";
import Fridge from "./Fridge";
import Login from "./Login";
import SweetAlert from 'sweetalert2-react';
import { Socket } from "./Socket";
import Chat from "./Chat";
import PopPanel from "./PopPanel";
import PopButton from "./PopButton";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      hasStatus:false,
      statusTitle: 'warning',
      statusMessage: ''
    }

    this.socket = Socket;

    this.socket.on('SHOW_STATUS_MESSAGE', function (data) {
      showStatus(data);
    });

    const showStatus = data => {
      this.setState({
        hasStatus:true,
        statusTitle: data.type,
        statusMessage: data.message
      });
    }

    /* Ugly hack to disable pull down refresh */
    this.preventPullToRefresh = () => {
      document.addEventListener("touchmove", function(e){
        
        if(e.target.classList[0] === 'magnet'){
          e.preventDefault(); 
        }
      },{passive:false});
    }
  }
  componentDidMount(){
    if (navigator.userAgent.toLowerCase().indexOf("android") > -1){
      document.body.classList.add('is-android');
    }
    this.preventPullToRefresh();
  }
  render() {
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
          <Chat/>
          <PopButton icon="fa fa-home" to="/room/lobby"/>
          <PopButton icon="fa fa-cog" to="/"/>
        </PopPanel>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/room' component={Rooms}/>
          <Route exact path='/room/lobby' component={Rooms}/>
          <Route exact path='/create-room' component={CreateRoom}/>
          <Route path='/room/:room' component={Fridge}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;