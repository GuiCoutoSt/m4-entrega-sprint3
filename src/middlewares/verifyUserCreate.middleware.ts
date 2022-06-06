import { NextFunction, Request, Response } from "express";

const verifyUserCreateMW = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  const wrongKeys = [];

  if (!name) {
    wrongKeys.push("name is a required field");
  }

  if (!email) {
    wrongKeys.push("email is a required field");
  }

  if (!password) {
    wrongKeys.push("password is a required field");
  }

  if (wrongKeys.length > 0) {
    return res.status(400).json({
      error: wrongKeys,
    });
  }

  return next();
};

export default verifyUserCreateMW;
