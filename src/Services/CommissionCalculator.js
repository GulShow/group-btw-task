import { Commission, User } from '../Models/index.js';
import FileReader from './FileReader.js';

/**
 * The main entry point of the application.
 * Connects to the rest of the classes and services, and performs calculations
 */
export default class CommissionCalculator {
  constructor() {
    this.data = null;
    this.commissionFees = null;
    this.users = {};
  }

  async readInput(fileName) {
    if (!fileName) {
      throw new Error('Filename required');
    }
    const filePath = (fileName.indexOf('/') > -1 && fileName) || `./${fileName}`;

    if (!FileReader.exists(filePath)) {
      throw new Error('File does not present');
    }

    const json = FileReader.read(filePath);
    try {
      this.data = JSON.parse(json);
    } catch (e) {
      throw new Error('File contains invalid json');
    }

    if (!Array.isArray(this.data)) {
      throw new Error('Data must be an array');
    }

    return this.data;
  }

  async calculate() {
    return this.data.map((transactionRow) => this.calculateRow(transactionRow));
  }

  async getCommissionRules() {
    const commissionClient = new Commission();
    this.commissionFees = await commissionClient.getCommissionMap();
  }

  calculateRow(transactionData) {
    let user = this.users[transactionData.user_id];
    if (!user) {
      user = new User({
        id: transactionData.user_id,
        type: transactionData.user_type,
      });
      this.users[transactionData.user_id] = user;
    }
    this.users[transactionData.user_id].addTransaction({
      transactionData,
      commissionFees: this.commissionFees,
    });

    return this.users[transactionData.user_id].transactionsHistory[
      this.users[transactionData.user_id].transactionsHistory.length - 1
    ];
  }
}
