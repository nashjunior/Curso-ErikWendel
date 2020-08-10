const Hapi = require("hapi");
const Context = require("./db/strategies/base/ContextStrategy");
const MongoDb = require("./db/strategies/mongodb/mongodb");
const HeroeSchema = require("./db/strategies/mongodb/schema/heroes");
const HeroRoutes = require("./routes/heroRoute");

const app = new Hapi.Server({ port: 5000 });

function mapRoutes(instance, methods) {
  return methods.map((method) => instance[method]());
}

async function main() {
  const connection = MongoDb.connect();
  const mongoDb = new Context(new MongoDb(connection, HeroeSchema));

  app.route([...mapRoutes(new HeroRoutes(mongoDb), HeroRoutes.methods())]);

  await app.start();
  return app;
}

module.exports = main();
