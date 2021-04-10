import store from '../redux/store';


const baseURL =
window.location.hostname === "localhost"
  ? "http://localhost:3000/api/v1"
  : "https://fast-ridge-64559.herokuapp.com/api/v1"

class BaseService {
  // baseurl = process.env.REACT_APP_API_URL;
  // endpoint;


  // constructor() {
  //   this.endpoint = this.baseurl+'/api/v1';
  // }

  errorMessage(message) {
    return {
      errors: { 
        error: [message]
      }
    }
  }

  getToken = () => {
    const state = store.getState();
    if (state.token !== undefined) return state.token;
  }

  getUser = () => {
    const state = store.getState();
    return state.user.length < 1 ? false : state.user
  }

  token = () => {
    return this.getToken();
  }
}

export default BaseService;