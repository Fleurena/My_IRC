import React, { Component } from 'react';
import './App.css';
import Chat from './send';
import Connexion from './components/connexion';
import Greeting from './components/login';
import io from 'socket.io-client';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      socket : io('http://127.0.0.1:3001/'),
    }
  }
  
  render() {
    return(
        <Chat socket = {this.state.socket}/>

        // <Connexion socket = {this.state.socket}/>
      );
    }
  }

export default App;
