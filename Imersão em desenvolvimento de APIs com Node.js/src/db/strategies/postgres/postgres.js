const Icrud = require('./../interfaces/InterfaceCrud')
const Sequelize = require('sequelize')
class Postgres extends Icrud {
  constructor(connection, schema){ 
    super() 
    this.connection = connection
    this._schema = schema
  }
  
   static async connect(){
   const connection = new Sequelize(
      'courses',
      'postgres',
      'docker',
      {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false,
        logging: false,
      }
    )
    return connection
  }
  async isConnected(){
    try {
      await this.connection.authenticate()
      return true
    } catch (error) {
      return false
    }
  }

 static async defineModel(connection, schema){
    const model = connection.define(schema.name,schema.schema, schema.options)
    await model.sync()
    return model;
  }

  async create(item) {
   const {dataValues}= await this._schema.create(item)
   delete dataValues.id
   return dataValues;
  }

  async read(item){
    const result= await this._schema.findAll({where: item, raw: true})
    return result
  }

  async update(id, item){
    return await this._schema.update(item, {where: {id: id}})
  }

  async delete(id){
    const query = id ? {id} :{}
    return await this._schema.destroy({where: query})
  }
}
module.exports = Postgres