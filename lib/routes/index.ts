import express from 'express';
import passport from 'passport';
import { isBlocked, tokenBlacklist } from '../middlewares';
import { validateErrors } from './RequestValidations';
import { newComment } from './RequestValidations';
import { CommentController } from '../controller';

const router = express.Router();

function getRouter() {
  router.get('/hello', (req, res) => {
    res.send({ message: 'Hello from comment' });
  });

  router.post('', [passport.authenticate('jwt-access', { session: false }), isBlocked, tokenBlacklist, newComment(), validateErrors, CommentController.createComment]);
  return router;
}

export const routes = getRouter();
