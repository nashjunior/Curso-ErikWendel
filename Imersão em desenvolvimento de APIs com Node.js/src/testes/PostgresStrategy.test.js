const ContextStrategy = require('../db/strategies/base/ContextStrategy')

const assert = require('assert');
const Postgres = require('../db/strategies/postgres');
const context = new ContextStrategy(new Postgres())
const MOCK_HEROI_CADASTRAR = {
  nome: 'Gaviao Arqueiro',
  poder: 'flexas'}

  const MOCK_HEROI_ATUALIZAER = {
    nome: 'Batman',
    poder: 'Dinheiro'}

describe('Postgres Strategy',function () {
  this.timeout(Infinity)
  this.beforeAll(async function (){
    await context.connect()
    await context.create(MOCK_HEROI_ATUALIZAER)
  })
  it('Postgres Connection', async function () {
    const result = await context.isConnected()
    assert.equal(result, true)
  })

  it('cadastrar', async function() {
    const result = await context.create(MOCK_HEROI_CADASTRAR);
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
  });

  it('listar', async function() {
    const [result] = await context.read(MOCK_HEROI_CADASTRAR);
    delete result.id;
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it('update', async function() {
    const [itemAutializar] = await context.read({nome:MOCK_HEROI_ATUALIZAER.nome})
    const novoItem = { ...MOCK_HEROI_ATUALIZAER, nome: 'Mulher Maravilha' }
    const [result] = await context.update(itemAutializar.id, novoItem)
    const [itemAtualiazado] = await context.read({id: itemAutializar.id})
    assert.deepEqual(itemAtualiazado.nome, novoItem.nome)
  });

  it.only('delete',async function() {
    const [item] = await context.read({});
    const result = await context.delete(item.id);
    assert.deepEqual(result, 1);
  });
});