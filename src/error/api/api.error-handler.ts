import { Request, Response, NextFunction } from 'express';
import ApiError from './api.error';
import * as httpCode from '../../constants/http-code.constant'

export default function apiErrorHandler(err, _req: Request, res: Response, _next: NextFunction) {
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }

  res.status(httpCode.INTERNAL_SERVER_ERROR).json('something went wrong');
}