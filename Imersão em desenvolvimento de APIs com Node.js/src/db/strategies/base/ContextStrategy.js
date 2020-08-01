const Icrud = require('../interfaces/InterfaceCrud')

class ContextStrategy extends Icrud{

  constructor(strategy) {
    super();
    this._database = strategy;
  }

  read(item){
    return this._database.read(item)
  }

  create(item){
    return this._database.create(item)
  }

  update(id,item){
    return this._database.update(id, item)
  }

  delete(id){
    return this._database.delete(id)
  }

  isConnected(){
    return this._database.isConnected()
  }

  static connect() {
    return this._database.connect()
  }
}

module.exports= ContextStrategy;