import { User } from "../models/User";

export default class UserRepository {
  static findOneByQuery(query) {
    return User.findOne({
      where: query,
    });
  }

  static createUser(data) {
    return User.create(data);
  }
}

module.exports = UserRepository;
