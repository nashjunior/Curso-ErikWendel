const ContextStrategy = require('../db/strategies/base/ContextStrategy')

const assert = require('assert');
const Mongodb = require('../db/strategies/mongodb');
const MongoDb = require('../db/strategies/mongodb');
const context = new ContextStrategy(new MongoDb())
const MOCK_HEROI_CADASTRAR = {
  nome: 'Gaviao Arqueiro',
  poder: 'flexas'}

  const MOCK_HEROI_DEFAULT= {
    nome: 'Homem Aranha',
    poder: 'Teia'
  }

  const MOCK_HEROI_ATUALIZAER = {
    nome: 'Batman',
    poder: 'Dinheiro'}

let MOCK_HERO_ID = 0
describe('MongoDB Strategy',function () {
  //this.timeout(Infinity)
  this.beforeAll(async () => {
    await context.connect()
    const result = await context.create(MOCK_HEROI_ATUALIZAER)
    MOCK_HERO_ID = result._id
  })
  it('MongoDb Connection', async function () {
    const result = await context.isConnected()
    assert.deepEqual(result, 'Conectado')
  })

  it('cadastrar', async function() {
    const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR);
    assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
  });

  it('listar', async function() {
    const [{nome, poder}] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome}, 50, 20);
    assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR);
  });

  it('update', async function() {
    console.log(MOCK_HERO_ID)
    const itemAutializar = await context.update(MOCK_HERO_ID,{nome:MOCK_HEROI_DEFAULT.nome})
    console.log(itemAutializar)
    assert.deepEqual(itemAutializar.nModified, 1)
  });

  it('delete',async function() {
    const result = await context.delete(MOCK_HERO_ID)
    assert.deepEqual(result.n, 1);
  });
});