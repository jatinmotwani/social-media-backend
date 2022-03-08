import { Comment } from "../models/Comment";

export default class CommentRepository {
  static findOneByQuery(query) {
    return Comment.findOne({
      where: query,
    });
  }

  static createComment(data) {
    return Comment.create(data);
  }

  static list(filters) {
    return Comment.findAll(filters);
  }
}

module.exports = CommentRepository;
