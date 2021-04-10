import React from 'react';
import userService from "../services/user-service";
import actioncable from 'actioncable';



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