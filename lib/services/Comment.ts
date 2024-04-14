import CommentModel from '../DB/Models/Comment';
import type mongoose from 'mongoose';

class CommentService {
  // New comment creation
  public static async newComment(postId: string | mongoose.Types.ObjectId,
    userId: string | mongoose.Types.ObjectId,
    comment: string) {
    return new CommentModel({
      postId,
      userId,
      comment
    }).save();
  }

  // Update Comment
  public static async updateComment(commentId: string | mongoose.Types.ObjectId,
    updatedCommentText: string,
    userId: string | mongoose.Types.ObjectId){
    return CommentModel.findOneAndUpdate({
      _id: commentId,
      userId,
    }, {
      comment: updatedCommentText
    }, {
      new: true
    });
  }

  // Delete comment
  public static async deleteComment(commentId: string | mongoose.Types.ObjectId, userId: string | mongoose.Types.ObjectId) {
    return CommentModel.findOneAndDelete({
      _id: commentId,
      userId
    });
  }

  public static async getPostComments(postId: mongoose.Types.ObjectId | string){
    return CommentModel.find({
      postId
    });
  }
}

export { CommentService };
