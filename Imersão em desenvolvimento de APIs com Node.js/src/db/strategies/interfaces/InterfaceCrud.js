class NotImplementedException extends Error{
  constructor(){
    super('Not implemented Exception')
  }
}

class Icrud {
  connect(){
    throw new NotImplementedException()
  }

  read(item){
    throw new NotImplementedException();
  }

  create(item) {
    throw new NotImplementedException()
  }

  update(id, item) {
    throw new NotImplementedException()
  }

  delete(id){
    throw new NotImplementedException()
  }

  isConnected(){
    throw new NotImplementedException()
  }
}

module.exports=Icrud