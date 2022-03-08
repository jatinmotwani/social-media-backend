import { Like } from "../models/Like";

export default class LikeRepository {
  static findOneByQuery(query) {
    return Like.findOne({
      where: query,
    });
  }

  static createLike(data) {
    return Like.create(data);
  }

  static list(filters) {
    return Like.findAll(filters);
  }
}

module.exports = LikeRepository;
