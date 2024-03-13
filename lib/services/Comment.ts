import type { IComment } from '../DB/Models/Comment';
import CommentModel from '../DB/Models/Comment';
import type { IUser } from '../DB/Models/User';

class Comment {
  // New comment creation
  public static async createComment(user: IUser, postId: string, commentText: string): Promise<IComment> {
    const newComment: IComment = new CommentModel({
      userId: user.id,
      postId,
      comment: commentText
    });

    // Save the comment to the database and return the saved document
    return newComment.save();
  }

  // Update Comment
  public static async updateComment(commentId: string, updatedCommentText: string): Promise<IComment | null> {
    return CommentModel.findByIdAndUpdate(commentId, { comment: updatedCommentText }, { new: true });
  }

  // Delete comment
  public static async deleteComment(commentId: string): Promise<boolean> {
    const result = await CommentModel.findByIdAndDelete(commentId);
    return !!result; // If result is null, return false; otherwise, return true
  }
}

export { Comment };
