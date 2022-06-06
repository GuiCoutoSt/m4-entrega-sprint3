import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const verifyAuthTokenMW = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      error: "missing authorization token",
    });
  }

  const realToken = token.split(" ")[1];

  jwt.verify(realToken, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        name: "JsWebTokenError",
        message: "jwt malformed or expired",
      });
    }

    return next();
  });
};

export default verifyAuthTokenMW;
