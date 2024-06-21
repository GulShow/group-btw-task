import assert from 'assert';
import { FileReader } from '../../src/Services/index.js';

describe('FileReader tests', () => {
  it('If a file package.json exists', async () => {
    assert.strictEqual(FileReader.exists('./package.json'), true);
  });

  it('Check package.json file', async () => {
    const content = await FileReader.read('./package.json');
    assert.strictEqual(
      JSON.parse(content).name,
      'groupbtw-test-task',
    );
  });
});
