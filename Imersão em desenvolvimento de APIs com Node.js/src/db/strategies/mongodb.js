import Icrud from "./interfaces/InterfaceCrud.js"


class MongoDb extends Icrud {
  constructor(){ super()}

  create(item) { 
    console.log('mongodb')
  }
}

export default MongoDb