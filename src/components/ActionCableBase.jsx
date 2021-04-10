import React from 'react';
import userService from "../services/user-service";
import actioncable from 'actioncable';

const cableURL ="ws://localhost:3000/cable"
  // window.location.hostname === "localhost"
  //   ? "ws://localhost:3000/cable"
  //   : "wss://fast-ridge-64559.herokuapp.com/cable"

class ActionCableBase extends React.Component {
  constructor() {
    super();
    this.consumer = actioncable.createConsumer(`${cableURL}?token=${userService.token()}`)
  }
  
  render() { 
    return ( null );
  }
}
 
export default ActionCableBase;