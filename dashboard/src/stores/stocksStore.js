import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class StocksStore {
  userStocks = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUserStocks() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.userStocks = response.data.stocks;
    } catch (error) {
      console.error('Error fetching user stocks:', error);
    }
  }

  async addStock(stockSymbol) {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/users/stocks`,
        { stocks: [...this.userStocks, stockSymbol] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      this.userStocks.push(stockSymbol); // Update MobX store
    } catch (error) {
      console.error('Error adding stock:', error);
    }
  }

  async removeStock(stockSymbol) {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/users/stocks`,
        { stocks: this.userStocks.filter((s) => s !== stockSymbol) },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      this.userStocks = this.userStocks.filter((s) => s !== stockSymbol); // Update MobX store
    } catch (error) {
      console.error('Error removing stock:', error);
    }
  }
}

export const stocksStore = new StocksStore();
export const useStocksStore = () => stocksStore;
