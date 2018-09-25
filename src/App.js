import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Rooms from "./Rooms";
import Fridge from "./Fridge";
import Login from "./Login";
import "./App.css";

class App extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){

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