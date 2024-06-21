import assert from 'assert';
import { Cache } from '../../src/Services/index.js';

describe('Cache service tests', () => {
  it('Check the set and get operations', async () => {
    const сacheClient = new Cache();
    assert.strictEqual(await сacheClient.get('variable-test-1'), null);
    await сacheClient.set('variable-test-1', 'johndoe');
    assert.strictEqual(await сacheClient.get('variable-test-1'), 'johndoe');
  });

  it('Check the set and get operations', async () => {
    const сacheClient = new Cache();
    await сacheClient.set('variable-test-1', 'johndoe');
    const сacheClient2 = new Cache();
    assert.strictEqual(await сacheClient2.get('variable-test-1'), 'johndoe');
  });

  it('Check the all operation', async () => {
    const сacheClient = new Cache();
    await сacheClient.set('variable-test-1', 'johndoe');
    await сacheClient.set('variable-test-2', 'johndoe');
    assert.strictEqual(await сacheClient.get('variable-test-1'), 'johndoe');
    await сacheClient.flush();
    assert.strictEqual(await сacheClient.get('variable-test-1'), null);
    assert.strictEqual(await сacheClient.get('variable-test-2'), null);
  });
  it('Check the operation', async () => {
    const сacheClient = new Cache();
    await сacheClient.set('variable-test-1', 'johndoe');
    await сacheClient.set('variable-test-2', 'johndoe');
    assert.strictEqual(await сacheClient.get('variable-test-1'), 'johndoe');
    await сacheClient.flush('variable-test-1');
    assert.strictEqual(await сacheClient.get('variable-test-1'), null);
    assert.strictEqual(await сacheClient.get('variable-test-2'), 'johndoe');
  });
});
