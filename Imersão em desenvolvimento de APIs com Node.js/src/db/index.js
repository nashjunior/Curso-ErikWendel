
const ContextStrategy = require('./strategies/base/ContextStrategy')
const MongoDb = require('./strategies/mongodb')
const Postgres =require('./strategies/postgres')

const contextMongo = new ContextStrategy(new MongoDb())
contextMongo.create()

const contextPostgres = new ContextStrategy(new Postgres())