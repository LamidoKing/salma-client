import React from 'react';
import userService from "../services/user-service";
import actioncable from 'actioncable';

const cableURL =
  window.location.hostname === "localhost"
    ? "ws://localhost:3000/cable"
    : "wss://fast-ridge-64559.herokuapp.com/cable"

class ActionCableBase extends React.Component {
  constructor() {
    super();
    this.consumer = actioncable.createConsumer(`${cableURL}/cable?token=${userService.token()}`)
  }
  
  render() { 
    return ( null );
  }
}
 
export default ActionCableBase;