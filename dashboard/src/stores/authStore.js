import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class AuthStore {
  user = null; // To hold user details like username
  token = localStorage.getItem('token') || null;

  constructor() {
    makeAutoObservable(this);
  }

  async login(username, password) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        username,
        password,
      });

      this.token = response.data.access_token;
      localStorage.setItem('token', this.token);

      // After login, fetch the user details to populate user info
      await this.fetchUserDetails();
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  async fetchUserDetails() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/me`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });

      this.user = response.data; // Save the entire user object
    } catch (error) {
      console.error('Error fetching user details:', error);
      this.logout(); // Invalidate session if fetching user details fails
    }
  }

  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem('token');
  }

  // Computed value to check if the user is authenticated
  get isAuthenticated() {
    return !!this.token;
  }
}

export const authStore = new AuthStore();
export const useAuthStore = () => authStore;
