
import ContextStrategy from './strategies/base/ContextStrategy.js';
import MongoDb from './strategies/mongodb.js';
import Postgres from './strategies/postgres.js';

const contextMongo = new ContextStrategy(new MongoDb())
contextMongo.create()

const contextPostgres = new ContextStrategy(new Postgres())