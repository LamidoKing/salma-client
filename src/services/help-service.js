import BaseService from "./base-service";
import axios from "axios";

class HelpService extends BaseService {

  async create(data) {
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/helps`, JSON.stringify(data), {
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

  async getHelps() {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/helps`, {
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

  async getHelpsByCoordinates(tl, ll, bl, rl) {
    try {
      const response = await axios.get(`
        http://localhost:3000/api/v1/helps?coordinates=true&leftLong=${ll}&rightLong=${rl}&topLat=${tl}&bottomLat=${bl}`, 
      {
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

  async getHelp(id) {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/helps/${id}`, {
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

  async myHelps(id) {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/helps/me`, {
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

  async categories() {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/categories`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${this.token()}`
        }
      });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Something happened')
      }
    } catch (error) {
      console.log(error.response)
      return [];
    }
  }

  async reopen(id) {
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/helps/reopen`, JSON.stringify({id}), {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${this.token()}`
        }
      });

      
      return response;
      
    } catch (error) {
      if (error.response.status === 422) {
        return error.response;
      }
      throw new Error(error.response)
    }
  }

}

export default new HelpService;