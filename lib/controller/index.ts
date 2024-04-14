import type { Request, Response } from 'express';
import { CommentService } from '../services/Comment';
import type { IUser } from '../DB/Models/User';
import { httpCodes } from '../constants/http-status-code'; // Assuming Comment is the name of the service class

interface RequestValidatedByPassport extends Request {
  user: {
    userId: string;
    accessToken: string;
    phoneNumber: string,
    iat: number,
    exp: number,
  }
}

interface RequestInterferedByIsBlocked extends RequestValidatedByPassport {
  currentUser: IUser
}


class CommentController {
  public static async createComment(req: RequestInterferedByIsBlocked, res: Response) {
    try {
      const { matchedData: { postId, comment } } = req.body;
      const { userId } = req.user;

      const newComment = await CommentService.newComment(postId, userId, comment);

      return res.status(httpCodes.created).send({
        comment: newComment
      });
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public static async updateComment(req: RequestInterferedByIsBlocked, res: Response) {
    try {
      const { matchedData: { commentId, comment } } = req.body;
      const { userId } = req.user;
      const updatedComment = await CommentService.updateComment(commentId, comment, userId);
      return res.status(200).json({ code: httpCodes.ok, data: updatedComment });
    } catch (error) {
      console.error('Error updating comment:', error);
      res.status(500).json({ code: httpCodes.serverError, message: 'Internal Server Error' });
    }
  }

  public static async deleteComment(req: RequestInterferedByIsBlocked, res: Response) {
    try {
      const { matchedData: { commentId } } = req.body;
      const { userId } = req.user;
      const deletedComment = await CommentService.deleteComment(commentId, userId);
      return res.status(httpCodes.ok).send({
        deletedComment
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ code: httpCodes.serverError, message: 'Internal Server Error' });
    }
  }

  public static async getPostComments(req: RequestInterferedByIsBlocked, res: Response) {
    const { matchedData: { postId } } = req.body;
    const comments = await CommentService.getPostComments(postId);
    return res.status(httpCodes.ok).send({
      comments
    });
  }
}


export { CommentController };
