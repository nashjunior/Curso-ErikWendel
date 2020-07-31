const Icrud = require("./interfaces/InterfaceCrud")

class MongoDb extends Icrud {
  constructor(){ super()}

  create(item) { 
    console.log('mongodb')
  }
}

module.exports = MongoDb