const Icrud = require("./interfaces/InterfaceCrud")
const Mongoose = require('mongoose')

const Status = {
  0: 'Disconectado',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Disconectando'
}





class MongoDb extends Icrud {
  constructor(){ 
    super()
    this._heroes= null
    this.driver= null
    this.connect()
  }

  async connect() {
    Mongoose.connect('mongodb://user:docker@localhost:27017/courses', {useNewUrlParser: true}, function(error) {
      if(!error) return;
      console.log('Falha da conexao', error)
    })

    this.driver = Mongoose.connection
    this.driver.once('open', () => console.log('database rodando'))
    this.defineModel()
  }

  async isConnected(){
    const state = await Status[this.driver.readyState]
    switch(state) {
      case 'Conectado': return true
      case (state!=='Conectando'): return state
    }
    await new Promise(resolve => setTimeout(resolve, 1000))
    return Status[this.driver.readyState]
  }

  defineModel(){
    
    const heroesSchema = new Mongoose.Schema({
      nome: {
        type: String,
        required: true
      },
      poder: {
        type: String,
        required: true,
      },
      insertedAt: {
        type: Date,
        default: new Date()
      }
    })
    delete this.driver.models['heroes'];
    this._heroes = Mongoose.model('heroes', heroesSchema);
    
  }

  read(item, skip=0, limit=10){
    return this._heroes.find(item).skip(skip).limit(limit)
  }

 create(item) { 
    return this._heroes.create(item)
  }

  update(id,item){
    return this._heroes.updateOne({_id: id}, {$set: item})
  }

  delete(id) {
    return this._heroes.deleteOne({_id: id})
  }
}

module.exports = MongoDb