import { Post } from "../models/Post";

export default class PostRepository {
  static findOneByQuery(query) {
    return Post.findOne({
      where: query,
    });
  }

  static createPost(data) {
    return Post.create(data);
  }

  static update(query, data) {
    return Post.update(data, {
      where: query,
    });
  }
}

module.exports = PostRepository;
