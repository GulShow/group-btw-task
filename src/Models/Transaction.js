import { getWeekByDate } from '../Utils/date.js';

export default class Transaction {
  constructor({ date, type, operation }) {
    this.date = date;
    this.week = getWeekByDate(date);
    this.type = type;
    this.operation = operation;
    this.commission = 0;
  }

  calculateCommission({ userType, transactionsHistory, commissionFees }) {
    this.commission = 0;
    if (!commissionFees[this.type]) {
      throw new Error('Operation is not supported');
    }
    if (!commissionFees[this.type][userType]) {
      throw new Error('User is not supported');
    }
    const operationCommissionRule = commissionFees[this.type][userType];
    this.commission = (operationCommissionRule.percents / 100) * this.operation.amount;

    this.applyMaxRule(operationCommissionRule);
    this.applyMinRule(operationCommissionRule);
    this.applyWeekLimitRule(operationCommissionRule, transactionsHistory);
    this.roundingCommission();
  }

  applyMaxRule(operationCommissionRule) {
    if (
      !operationCommissionRule.max
      || operationCommissionRule.max.currency !== this.operation.currency
    ) {
      return;
    }
    this.commission = this.commission > operationCommissionRule.max.amount
      ? operationCommissionRule.max.amount
      : this.commission;
  }

  applyMinRule(operationCommissionRule) {
    if (
      !operationCommissionRule.min
      || operationCommissionRule.min.currency !== this.operation.currency
    ) {
      return;
    }
    this.commission = this.commission < operationCommissionRule.min.amount
      ? operationCommissionRule.min.amount
      : this.commission;
  }

  applyWeekLimitRule(operationCommissionRule, transactionsHistory) {
    if (
      !operationCommissionRule.week_limit
      || operationCommissionRule.week_limit.currency !== this.operation.currency
    ) {
      return;
    }
    const transferredInAWeek = transactionsHistory.reduce(
      (total, transaction) => total
          + (transaction.type === 'cash_out' && transaction.operation.amount)
        || 0,
      0,
    );
    const overage = this.operation.amount
      + transferredInAWeek
      - operationCommissionRule.week_limit.amount;
    this.commission = overage <= 0
      ? 0
      : (operationCommissionRule.percents / 100)
          * (overage > this.operation.amount ? this.operation.amount : overage);
  }

  roundingCommission() {
    this.commission = (Math.ceil(this.commission * 100) / 100).toFixed(2);
  }
}
