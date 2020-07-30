import ContextStrategy from './../db/strategies/base/ContextStrategy.js';
import Postgres from './../db/strategies/postgres.js';
import assert from 'assert'
const context = new ContextStrategy(new Postgres())

describe('Postgres Strategy',function () {
  this.timeout(Infinity)
  it('Postgres Connection', async function () {
    const result = await context.isConnected()
    assert.equal(result, true)
  })
});