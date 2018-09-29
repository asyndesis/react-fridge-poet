import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Rooms from "./Rooms";
import CreateRoom from "./CreateRoom";
import Fridge from "./Fridge";
import Login from "./Login";
import "./App.css";

class App extends Component {
  constructor(props){
    super(props);
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
    this.preventPullToRefresh();
  }
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/room' component={Rooms}/>
        <Route exact path='/create-room' component={CreateRoom}/>
        <Route path='/room/:room' component={Fridge}/>
      </Switch>
      
    );
  }
}

export default App;