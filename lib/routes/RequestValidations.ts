import { body, matchedData, param, validationResult } from 'express-validator';
import type { NextFunction, Request, Response } from 'express';
import { httpCodes } from '../constants/http-status-code';
const commentBody = () => {
  return [
    body('comment')
      .trim()
      .escape()
      .notEmpty()
      .isString()
      .withMessage('comment is required'),
  ];
};


const commentId = () => {
  return [
    param('commentId')
      .trim()
      .notEmpty()
      .escape()
      .isMongoId()
      .withMessage('Comment Id is required'),
  ];
};

const postId = () => {
  return [
    param('postId')
      .trim()
      .notEmpty()
      .escape()
      .isMongoId()
      .withMessage('Post Id is required'),
  ];
};

const validateErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const data = matchedData(req);
    req.body['matchedData'] = data;
    return next();
  }
  const extractedErrors: any = [];
  errors.array().map((err: any) => extractedErrors.push({ [err.param || err.path]: err.msg }));
  return res.status(httpCodes.unprocessable_entity).json({
    errors: extractedErrors
  });
};

export {
  commentBody, validateErrors, postId, commentId
};