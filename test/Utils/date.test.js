import assert from 'assert';
import { getWeekByDate } from '../../src/Utils/date.js';

describe('Date tests', () => {
  it('First and last days of the year', () => {
    const now = new Date('2024-12-31');
    const now2 = new Date('2024-01-01');
    assert.strictEqual(getWeekByDate(now), getWeekByDate(now2));
  });
  it('Last day of the week', () => {
    const now = new Date('2024-03-14');
    assert.strictEqual(getWeekByDate(now), 11);
  });
});
