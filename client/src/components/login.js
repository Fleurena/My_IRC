import React, { Component } from 'react';
import Chat from '../send';
import Connexion from './connexion';

function Greeting(props){
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn){
      return <Chat socket = {this.props.socket}/>;
    }
    return <Connexion />;
}

  export default Greeting;