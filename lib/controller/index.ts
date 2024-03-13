import type { Request, Response } from 'express';
import { Comment } from '../services/Comment';
import type { IUser } from '../DB/Models/User'; // Assuming Comment is the name of the service class

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
  public static async createComment(req: RequestInterferedByIsBlocked, res: Response): Promise<void> {
    try {
      // Extract necessary information from the request body
      const { postId, comment } = req.body;

      const { currentUser } = req;

      // Create the comment using the service
      const newComment = await Comment.createComment(currentUser, postId, comment);

      // Send the newly created comment as a response
      res.status(201).json(newComment);
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export { CommentController };
