import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Rooms from "./Rooms";
import Fridge from "./Fridge";
import Login from "./Login";
import "./App.css";

class App extends Component {
  constructor(props){
    super(props);
    this.preventPullToRefresh = () => {
      var prevent = false;
  
      document.querySelector('body').addEventListener('touchstart', function(e){
        if (e.touches.length !== 1) { return; }
  
        var scrollY = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
        prevent = (scrollY === 0);
      });
  
      document.querySelector('body').addEventListener('touchmove', function(e){
        if (prevent) {
          prevent = false;
          e.preventDefault();
        }
      });
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