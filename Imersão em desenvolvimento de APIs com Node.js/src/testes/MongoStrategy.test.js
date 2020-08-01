const ContextStrategy = require('../db/strategies/base/ContextStrategy')

const assert = require('assert');
const MongoDb = require('./../db/strategies/mongodb/mongodb');
const HeroeSchema = require('../db/strategies/mongodb/schema/heroes');
let context= {};


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
    const connection = MongoDb.connect();
    
    context = new ContextStrategy( new MongoDb(connection, HeroeSchema))
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
    const itemAutializar = await context.update(MOCK_HERO_ID,{nome:MOCK_HEROI_DEFAULT.nome})
    assert.deepEqual(itemAutializar.nModified, 1)
  });

  it('delete',async function() {
    const result = await context.delete(MOCK_HERO_ID)
    assert.deepEqual(result.n, 1);
  });
});