import LikeRepository from "../repository/like";
import PostRepository from "../repository/post";
import CommentRepository from "../repository/comment";
import { Messages } from "../utils/message";
import {
  badRequest,
  internalServerError,
  successResponse,
} from "../utils/response";
import { LikeType } from "../dto/post/likePost.dto";
import { User } from "../models/User";

export default class PostService {
  static createPost = async (req, res) => {
    try {
      const post = await PostRepository.createPost(
        Object.assign(req.body, { userId: req.user.id })
      );
      return successResponse(
        res,
        Messages.POST_MESSAGES.CREATE_POST_SUCCESS,
        post
      );
    } catch (error) {
      return internalServerError(res, Messages.POST_MESSAGES.CREATE_POST_ERROR);
    }
  };

  static like = async (req, res) => {
    try {
      if (req.body.postId && req.body.commentId) {
        return badRequest(res, Messages.POST_MESSAGES.INVALID_PARAMS, null);
      }
      if (req.body.likeType === LikeType.POST) {
        const post = await PostRepository.findOneByQuery({
          id: req.body.postId,
        });
        if (!post) {
          return badRequest(res, Messages.POST_MESSAGES.NOT_FOUND, null);
        }
        const alreadyLiked = await LikeRepository.findOneByQuery({
          userId: req.user.id,
          postId: req.body.postId,
        });
        if (alreadyLiked) {
          return badRequest(
            res,
            Messages.POST_MESSAGES.POST_LIKED_ALREADY,
            null
          );
        }
        await LikeRepository.createLike({
          userId: req.user.id,
          postId: req.body.postId,
        });
        await PostRepository.update(
          { id: req.body.postId },
          {
            like_count: post.like_count ? post.like_count++ : 1,
          }
        );
      } else {
        const comment = await CommentRepository.findOneByQuery({
          id: req.body.commentId,
        });
        if (!comment) {
          return badRequest(
            res,
            Messages.POST_MESSAGES.COMMENT_NOT_FOUND,
            null
          );
        }
        const alreadyLiked = await LikeRepository.findOneByQuery({
          userId: req.user.id,
          commentId: req.body.commentId,
        });
        if (alreadyLiked) {
          return badRequest(
            res,
            Messages.POST_MESSAGES.POST_LIKED_ALREADY,
            null
          );
        }
        await LikeRepository.createLike({
          userId: req.user.id,
          commentId: req.body.commentId,
        });
      }

      return successResponse(
        res,
        Messages.POST_MESSAGES.LIKE_POST_SUCCESS,
        null
      );
    } catch (error) {
      return internalServerError(res, Messages.POST_MESSAGES.LIKE_POST_ERROR);
    }
  };

  static comment = async (req, res) => {
    try {
      const post = await PostRepository.findOneByQuery({
        id: req.body.postId,
      });
      if (!post) {
        return badRequest(res, Messages.POST_MESSAGES.NOT_FOUND, null);
      }
      const alreadyCommented = await CommentRepository.findOneByQuery(
        Object.assign(req.body, { userId: req.user.id })
      );
      if (alreadyCommented) {
        return badRequest(res, Messages.POST_MESSAGES.POST_LIKED_ALREADY, null);
      }
      await CommentRepository.createComment(
        Object.assign(req.body, { userId: req.user.id })
      );
      await PostRepository.update(
        { id: req.body.postId },
        {
          comment_count: post.comment_count ? post.comment_count++ : 1,
        }
      );
      return successResponse(res, Messages.POST_MESSAGES.COMMENT_SUCCESS, null);
    } catch (error) {
      return internalServerError(res, Messages.POST_MESSAGES.COMMENT_ERROR);
    }
  };

  static getLikes = async (req, res) => {
    try {
      if (!req.params || !req.params.id) {
        return badRequest(res, Messages.POST_MESSAGES.INVALID_PARAMS, null);
      }
      const post = await PostRepository.findOneByQuery({
        id: req.params.id,
      });
      if (!post) {
        return badRequest(res, Messages.POST_MESSAGES.NOT_FOUND, null);
      }
      const list = await LikeRepository.list({
        where: {
          userId: req.user.id,
          postId: req.params.id,
        },
        order: [["createdAt", "DESC"]],
        include: {
          model: User,
          as: "user",
          attributes: ["fullName", "email"],
        },
      });
      return successResponse(
        res,
        Messages.POST_MESSAGES.GET_LIKES_SUCCESS,
        list
      );
    } catch (error) {
      return internalServerError(res, Messages.POST_MESSAGES.GET_LIKES_ERROR);
    }
  };

  static getCommentLikes = async (req, res) => {
    try {
      if (!req.params || !req.params.id) {
        return badRequest(res, Messages.POST_MESSAGES.INVALID_PARAMS, null);
      }
      const post = await PostRepository.findOneByQuery({
        id: req.params.id,
      });
      if (!post) {
        return badRequest(res, Messages.POST_MESSAGES.NOT_FOUND, null);
      }
      const comment = await CommentRepository.findOneByQuery({
        postId: req.params.id,
        userId: req.user.id,
      });
      if (!comment) {
        return badRequest(res, Messages.POST_MESSAGES.NO_COMMENT_ON_POST, null);
      }
      const list = await LikeRepository.list({
        where: {
          userId: req.user.id,
          commentId: comment.id,
        },
        attributes: ["id"],
        order: [["createdAt", "DESC"]],
        include: {
          model: User,
          as: "user",
          attributes: ["fullName", "email"],
        },
      });
      return successResponse(
        res,
        Messages.POST_MESSAGES.GET_COMMENT_LIKES_SUCCESS,
        list
      );
    } catch (error) {
      return internalServerError(
        res,
        Messages.POST_MESSAGES.GET_COMMENT_LIKES_ERROR
      );
    }
  };

  static getComments = async (req, res) => {
    try {
      if (!req.params || !req.params.id) {
        return badRequest(res, Messages.POST_MESSAGES.INVALID_PARAMS, null);
      }
      const post = await PostRepository.findOneByQuery({
        id: req.params.id,
      });
      if (!post) {
        return badRequest(res, Messages.POST_MESSAGES.NOT_FOUND, null);
      }
      const list = await CommentRepository.list({
        where: {
          postId: req.params.id,
        },
        order: [["createdAt", "DESC"]],
        attributes: ["id", "content"],
        include: {
          model: User,
          as: "user",
          attributes: ["fullName", "email"],
        },
      });
      return successResponse(
        res,
        Messages.POST_MESSAGES.GET_COMMENTS_SUCCESS,
        list
      );
    } catch (error) {
      return internalServerError(
        res,
        Messages.POST_MESSAGES.GET_COMMENTS_ERROR
      );
    }
  };
}
