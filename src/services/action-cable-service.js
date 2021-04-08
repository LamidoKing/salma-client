import userService from "./user-service";
import ActionCable from 'actioncable'


const cableURL =
  window.location.hostname === "localhost"
    ? "ws://localhost:3000/cable"
    : "wss://fast-ridge-64559.herokuapp.com/cable"

const consumer = () => {
  return ActionCable.createConsumer(`cableURL?token=${userService.token()}`);
}

export const HelpChannel = () => {
  try {
    return consumer.subscriptions.create({channel: 'HelpChannel'}, {
      received: () => console.log('Received info from help')
    })
  } catch (error) {
    console.log('Action cable service: ', error);
  }
  
}

export default consumer;