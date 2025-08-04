const { getDB } = require("../db");

class UserModel {
  static collection() {
    return getDB().collection("nagp-collection");
  }

  static async findAll() {
    return await this.collection().find({}).toArray();
  }

  static async findById(empId) {
    return await this.collection().findOne({ empId });
  }
}

module.exports = UserModel;
