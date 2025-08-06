const { getDB } = require("../db");

class UserModel {
  static collection() {
    return getDB().collection("nagp-users-collection-1");
  }

  static async findAll() {
    return await this.collection().find({}).toArray();
  }

  static async findById(empId) {
    return await this.collection().findOne({ empId });
  }

  static async deleteById(empId) {
    try {
      
      const result = await this.collection().deleteOne({ empId });
      return result.deletedCount > 0; // true if a user was deleted
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = UserModel;
