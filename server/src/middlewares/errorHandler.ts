import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";
const errorHandler = (
  error: ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status: number = 500;
  let data: { message: string } = {
    message: "Internal Server Error",
  };

  if (error instanceof ValidationError) {
    status = 401;
    data.message = error.message;
    return res.status(status).json(data);
  }

  if (error.message) {
    data.message = error.message;
  }
  next();
  return res.json(data);
};

export default errorHandler;
