import { type Request, type Response, type NextFunction} from 'express';

import { CustomError } from '../errors/custom-error';

export function errorHandler(
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    message: err.message
  });
}