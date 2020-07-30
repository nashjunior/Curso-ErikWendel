import Icrud from "./interfaces/InterfaceCrud.js"
import Sequelize from 'sequelize'

class Postgres extends Icrud {
  constructor(){ 
    super() 
    this.driver = null
    this._heroes = null
    this._connect()
  }
  
  _connect(){
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
      console.log(this.driver.authenticate())
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

  create(item) {
    
  }
}
export default Postgres