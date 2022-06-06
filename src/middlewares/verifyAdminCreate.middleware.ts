import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import findAdminService from "../services/admin/findAdmin.service";

const verifyAdminCreateMW = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  const { isAdm } = req.body;

  if (!token && !isAdm) {
    return next();
  }

  if (!token && isAdm) {
    return res.status(401).json({
      message: "missing admin permision",
    });
  }

  if (token && isAdm) {
    const realToken = token.split(" ")[1];

    const decodedToken = jwt.decode(realToken);

    const user = await findAdminService(decodedToken);

    if (!user.isAdm) {
      return res.status(401).json({
        error: {
          name: "JsonWebTokenError",
          message: "jwt malformed",
        },
      });
    }
  }

  return next();
};

export default verifyAdminCreateMW;
