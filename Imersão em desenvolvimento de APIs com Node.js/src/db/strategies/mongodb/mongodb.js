const Icrud = require("./../interfaces/InterfaceCrud");
const Mongoose = require("mongoose");
const Status = {
  0: "Disconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Disconectando",
};

class MongoDb extends Icrud {
  constructor(connection, schema) {
    super();
    this._schema = schema;
    this.connection = connection;
  }

  static connect() {
    Mongoose.connect(
      "mongodb://user:docker@localhost:27017/courses",
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (error) {
        if (!error) return;
        console.log("Falha da conexao", error);
      }
    );

    const connection = Mongoose.connection;
    connection.once("open", () => console.log("database running"));
    return connection;
  }

  async isConnected() {
    const state = Status[this.connection.readyState];
    console.log(state);
    switch (state) {
      case "Conectado":
        return "Conectado";
      case state !== "Conectando":
        return state;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Status[this.connection.readyState];
  }

  read(item, skip = 0, limit = 10) {
    return this._schema.find(item).skip(skip).limit(limit);
  }

  create(item) {
    return this._schema.create(item);
  }

  update(id, item) {
    return this._schema.updateOne({ _id: id }, { $set: item });
  }

  delete(id) {
    return this._schema.deleteOne({ _id: id });
  }
}

module.exports = MongoDb;
