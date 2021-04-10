import React from 'react';
import userService from "../services/user-service";
import actioncable from 'actioncable';
import URL from '../services/UrlServices'




class ActionCableBase extends React.Component {
  constructor() {
    super();
    this.consumer = actioncable.createConsumer(`${URL.cableURL}?token=${userService.token()}`)
  }
  
  render() { 
    return ( null );
  }
}
 
export default ActionCableBase;