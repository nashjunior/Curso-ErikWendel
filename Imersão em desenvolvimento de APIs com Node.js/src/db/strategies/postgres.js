const Icrud = require('./interfaces/InterfaceCrud')
const Sequelize = require('sequelize')
class Postgres extends Icrud {
  constructor(){ 
    super() 
    this.driver = null
    this._heroes = null
  }
  
   async connect(){
    this.driver = new Sequelize(
      'courses',
      'postgres',
      'docker',
      {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false,
      }
    )
    await this.defineModel()
  }
  async isConnected(){
    try {
      await this.driver.authenticate()
      return true
    } catch (error) {
      return false
    }
  }

  async defineModel(){
    this._heroes = this.driver.define('heroes',
    {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true
        },
        nome: {
          type: Sequelize.STRING,
          required: true
        },
        poder: {
          type: Sequelize.STRING,
          required: true
        }
      },
      {
        tableName: 'tb_heroes',
        freezeTableName: false,
        timestamps: false,
        schema: 'imersao_erik_wendel'
      }
    )
    await this._heroes.sync()
  }

  async create(item) {
   const {dataValues}= await this._heroes.create(item)
   delete dataValues.id
   return dataValues;
  }

  async read(item){
    const result= await this._heroes.findAll({where: item, raw: true})
    return result
  }

  async update(id, item){
    return await this._heroes.update(item, {where: {id: id}})
  }

  async delete(id){
    const query = id ? {id} :{}
    return await this._heroes.destroy({where: query})
  }
}
module.exports = Postgres