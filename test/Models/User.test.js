import assert from 'assert';
import User from '../../src/Models/User.js';
import transactionsList from '../transactions.js';
import commissionFees from '../commissionFees.js';

describe('User tests', () => {
  it('Add transaction to user history', () => {
    const transaction = transactionsList[0];
    const user = new User({
      id: transaction.user_id,
      type: transaction.user_type,
    });

    user.addTransaction({
      transactionData: transaction,
      commissionFees,
    });

    assert.strictEqual(user.transactionsHistory.length, 1);
  });

  it('Create user by transaction', () => {
    const user = new User({
      id: transactionsList[0].user_id,
      type: transactionsList[0].user_type,
    });
    assert.strictEqual(user.id, 1);
    assert.strictEqual(user.type, 'natural');
  });
});
