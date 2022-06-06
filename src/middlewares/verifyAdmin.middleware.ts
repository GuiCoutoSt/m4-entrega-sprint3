import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import findAdminService from "../services/admin/findAdmin.service";

dotenv.config();

const verifyAdminTokenMW = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  const realToken = token.split(" ")[1];

  const decodedToken = jwt.decode(realToken);

  const user = await findAdminService(decodedToken);

  if (!user.isAdm) {
    return res.status(401).json({
      error: "missing admin permision",
    });
  }

  return next();
};

export default verifyAdminTokenMW;
