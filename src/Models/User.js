import { Transaction } from './index.js';

export default class User {
  constructor({ id, type }) {
    this.id = id;
    this.type = type;
    this.transactionsHistory = [];
  }

  addTransaction({ transactionData, commissionFees }) {
    const newTransaction = new Transaction(transactionData);
    newTransaction.calculateCommission({
      userType: this.type,
      transactionsHistory: this.getTransactionsByCurrentWeek(newTransaction),
      commissionFees,
    });
    this.transactionsHistory.push(newTransaction);
  }

  getTransactionsByCurrentWeek(transaction) {
    return this.transactionsHistory.filter(
      (oldTransaction) => transaction.week === oldTransaction.week,
    );
  }
}
