import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Rooms from "./Rooms";
import Fridge from "./Fridge";
import Login from "./Login";
import "./App.css";

class App extends Component {
  constructor(props){
    super(props);
    /* Ugly hack to disable pull down refresh */
    this.preventPullToRefresh = () => {
      var prevent = false;

      document.querySelector('#fridge').addEventListener('touchstart', function(e){
        if (e.touches.length !== 1) { return; }
        
        var scrollY = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
        prevent = (scrollY === 0);
      }, {passive: false});
  
      document.querySelector('#fridge').addEventListener('touchmove', function(e){
        if (e.target.classList[0] === "magnet"){
          prevent = true;
        }
        if (prevent) {
          prevent = false;
          e.preventDefault();
        }
      }, {passive: false});
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
        <Route path='/room/:room' component={Fridge}/>
      </Switch>
    );
  }
}

export default App;