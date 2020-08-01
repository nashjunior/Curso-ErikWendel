const ContextStrategy = require('../db/strategies/base/ContextStrategy')

const assert = require('assert');
const Mongodb = require('../db/strategies/mongodb');
const MongoDb = require('../db/strategies/mongodb');
const context = new ContextStrategy(new MongoDb())
const MOCK_HEROI_CADASTRAR = {
  nome: 'Gaviao Arqueiro',
  poder: 'flexas'}

  const MOCK_HEROI_ATUALIZAER = {
    nome: 'Batman',
    poder: 'Dinheiro'}

describe('MongoDB Strategy',function () {
  //this.timeout(Infinity)
  this.beforeAll(async () => {
    await context.connect()
  })
  it('MongoDb Connection', async function () {
    const result = await context.isConnected()
    assert.deepEqual(result, 'Conectado')
  })

  it('cadastrar', async function() {
    const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR);
    assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
  });

/*   it('listar', async function() {
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

  it('delete',async function() {
    const [item] = await context.read({});
    const result = await context.delete(item.id);
    assert.deepEqual(result, 1);
  }); */
});