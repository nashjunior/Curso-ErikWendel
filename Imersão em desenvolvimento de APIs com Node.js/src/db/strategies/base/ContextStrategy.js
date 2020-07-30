import Icrud from './../interfaces/InterfaceCrud.js';

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

  update(item){
    return this._database.update(id, item)
  }

  delete(item){
    return this._database.create(id)
  }
  isConnected(){
    this._database.isConnected()
  }
}

export default ContextStrategy;