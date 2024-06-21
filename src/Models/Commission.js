import axios from 'axios';
import { Cache } from '../Services/index.js';

const API_URL = process.env.API_URL || 'https://developers.paysera.com/tasks/api';

export default class Commission {
  constructor() {
    this.cache = new Cache();
    this.commissionMap = null;
  }

  static async getCashInCommission() {
    const cashInResponse = await axios.get(`${API_URL}/cash-in`);

    return {
      natural: cashInResponse.data,
      juridical: cashInResponse.data,
    };
  }

  static async getCashOutCommission() {
    const cashOutNaturalResponse = await axios.get(
      `${API_URL}/cash-out-natural`,
    );
    const cashOutLegalResponse = await axios.get(
      `${API_URL}/cash-out-juridical`,
    );
    return {
      natural: cashOutNaturalResponse.data,
      juridical: cashOutLegalResponse.data,
    };
  }

  async getCommissionMap() {
    if (!this.commissionMap) {
      this.commissionMap = await this.cache.get('commission-map', async () => ({
        cash_in: await Commission.getCashInCommission(),
        cash_out: await Commission.getCashOutCommission(),
      }));
    }
    return this.commissionMap;
  }
}
