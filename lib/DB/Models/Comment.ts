import mongoose from 'mongoose';
import type { Document, Model } from 'mongoose';
import UserModel from './User';
import PostModel from './Post';


export interface IComment extends Document{
  userId: mongoose.Types.ObjectId,
  postId: mongoose.Types.ObjectId,
  comment: string
}

const CommentSchema: mongoose.Schema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: UserModel, // Connection user collection - useful during popular operations
    required: true,
    index: true,
  },

  postId: {
    type: mongoose.Types.ObjectId,
    ref: PostModel, // Connection user collection - useful during popular operations
    required: true,
    index: true,
  },

  comment: {
    type: String, // Connection user collection - useful during popular operations
    required: true,
    index: true,
  }
}, {
  timestamps: true,
});

const CommentModel: Model<IComment> = mongoose.model<IComment>('Comment', CommentSchema);

export default CommentModel;