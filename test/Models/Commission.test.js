import assert from 'assert';
import Commission from '../../src/Models/Commission.js';
import { Cache } from '../../src/Services/index.js';

describe('Commission model tests', () => {
  it('Get commission map without cache', async () => {
    const cache = new Cache();
    await cache.flush();
    const cashCommissionClient = new Commission();
    const cashInCommission = await cashCommissionClient.getCommissionMap();
    assert.strictEqual(typeof cashInCommission.cash_in, 'object');
    assert.strictEqual(typeof cashInCommission.cash_out, 'object');
  });

  it('Get cash in commission', async () => {
    const cashInCommission = await Commission.getCashInCommission();
    assert.strictEqual(typeof cashInCommission.natural, 'object');
    assert.strictEqual(typeof cashInCommission.juridical, 'object');
  });

  it('Get cash out commission', async () => {
    const cashInCommission = await Commission.getCashOutCommission();
    assert.strictEqual(typeof cashInCommission.natural, 'object');
    assert.strictEqual(typeof cashInCommission.juridical, 'object');
  });
});
