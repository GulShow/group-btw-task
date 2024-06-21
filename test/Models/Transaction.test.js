import assert from 'assert';
import Transaction from '../../src/Models/Transaction.js';
import transactionsList from '../transactions.js';
import commissionFees from '../commissionFees.js';

describe('Transaction tests', () => {
  it('Test cash in transaction', () => {
    const transaction = new Transaction(transactionsList[0]);
    transaction.calculateCommission({
      userType: transactionsList[0].user_type,
      transactionsHistory: [],
      commissionFees,
    });
    assert.strictEqual(transaction.commission, '0.06');
  });

  it('Apply max rule to commission calculate', () => {
    const transaction = new Transaction({ ...transactionsList[0] });
    transaction.operation.amount = 999999;
    transaction.calculateCommission({
      userType: transactionsList[0].user_type,
      transactionsHistory: [],
      commissionFees,
    });
    assert.strictEqual(transaction.commission, '5.00');
    transaction.operation.amount = 200;
  });
});
