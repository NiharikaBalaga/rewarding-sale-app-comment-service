import express from 'express';
import passport from 'passport';
import { isBlocked, tokenBlacklist } from '../middlewares';
import { commentId, postId, validateErrors } from './RequestValidations';
import { commentBody } from './RequestValidations';
import { CommentController } from '../controller';

const router = express.Router();

function getRouter() {
  router.get('/hello', (req, res) => {
    res.send({ message: 'Hello from comment' });
  });

  router.post('/:postId', [passport.authenticate('jwt-access', { session: false }),
    isBlocked, tokenBlacklist, postId(), commentBody(), validateErrors, CommentController.createComment]);
  router.get('/comments/:postId', [passport.authenticate('jwt-access',
    { session: false }), isBlocked, tokenBlacklist, postId(), validateErrors, CommentController.getPostComments]);
  router.patch('/:commentId', [passport.authenticate('jwt-access', { session: false }), isBlocked,
    tokenBlacklist, commentId(), commentBody(), validateErrors, CommentController.updateComment]);
  router.delete('/:commentId', [passport.authenticate('jwt-access', { session: false }),
    isBlocked, tokenBlacklist, commentId(), validateErrors, CommentController.deleteComment]);
  return router;
}

export const routes = getRouter();
