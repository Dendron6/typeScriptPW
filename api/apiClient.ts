import axios from 'axios';
import qs from 'querystring';


class APIClient {
  readonly baseURL_API: string | undefined;

  constructor() {
    this.baseURL_API = process.env.BASEURL_API;
  }

  // this is example of api token that uses username and password and application/x-www-form-urlencoded 
  async getToken() {
    const formData = qs.stringify({
      username: process.env.API_USER,
      password: process.env.API_PASSWORD
    });
    const response = await axios.post(`${this.baseURL_API}/token`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data.access_token;
  }



  async createNewTask(text:string, status:string  = "Draft") {
    try {
      await axios.post(`${this.baseURL_API}/tasks`, {
        description: text,
        status: status,
        created_by: `${process.env.API_USER}`, // this is the user that will be used to create the task and based on the user you can later delete the task
      });
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async verifyTask(text:string, id:string) {
    try {
      const response = await axios.get(`${this.baseURL_API}/tasks/${id}`);
      return response.data.description === text;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async getTasks() {
    try {
      const response = await axios.get(`${this.baseURL_API}/tasks/`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async getTaskByDescription(description:string) {
    const response = await this.getTasks();
    for (const task of response) {
      if (task.description === description) {
        return task.id;
      }
    }
    // Only throw error after checking all tasks
    throw new Error('Task not found');
  }

  // in order to delete the task we need to get the token first, token if specific to user who created the task
  async delete(userNumber:string) {
    try {
      const token = await this.getToken();
      await axios.delete(`${this.baseURL_API}/tasks/${userNumber}`, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async get(endpoint:string) {
    try {
      const response = await axios.get(`${this.baseURL_API}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      });
      return response.data;

    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}

export { APIClient }; 