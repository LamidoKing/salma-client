import BaseService from "./base-service";
import axios from "axios";

class ChatService extends BaseService {

  async create(data) {
    try {
      const response = await axios.post(`https://fast-ridge-64559.herokuapp.com/api/v1/chats`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${this.token()}`
        }
      });

      if (response.status === 201) {
        return response;
      } 
    } catch (error) {
      if (error.response.status === 422) {
        return error.response;
      }
      throw new Error(error.response)
    }
  }

  async fetch(id) {
    try {
      const response = await axios.get(`https://fast-ridge-64559.herokuapp.com//api/v1/chats/help/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${this.token()}`
        }
      });
      
      if (response.status === 200) {
        return response.data;
      } 
    } catch (error) {
      console.log(error.response)
    }
  }
}

export default new ChatService;