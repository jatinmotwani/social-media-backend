import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { CreatePost } from "../dto/post/createPost.dto";
import { LikePost } from "../dto/post/likePost.dto";
import PostService from "../services/post";
import { badRequest } from "../utils/response";
import { Comment } from "../dto/post/comment.dto";

export default class PostController {
  static async createPost(req, res) {
    const errors = await validate(plainToClass(CreatePost, req.body));
    if (errors.length) {
      return badRequest(res, "Validation Error", {
        errors,
      });
    }
    return PostService.createPost(req, res);
  }
  static async like(req, res) {
    const errors = await validate(plainToClass(LikePost, req.body));
    if (errors.length) {
      return badRequest(res, "Validation Error", {
        errors,
      });
    }
    return PostService.like(req, res);
  }
  static async comment(req, res) {
    const errors = await validate(plainToClass(Comment, req.body));
    if (errors.length) {
      return badRequest(res, "Validation Error", {
        errors,
      });
    }
    return PostService.comment(req, res);
  }
  static getLikes(req, res) {
    return PostService.getLikes(req, res);
  }
  static getCommentLikes(req, res) {
    return PostService.getCommentLikes(req, res);
  }
  static getComments(req, res) {
    return PostService.getComments(req, res);
  }
}
