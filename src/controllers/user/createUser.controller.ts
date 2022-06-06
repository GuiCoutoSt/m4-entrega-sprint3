import { Request, Response } from "express";
import { handleError } from "../../errors/appError";

import createUserService from "../../services/user/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, isAdm } = req.body;

    const user = await createUserService({ name, email, password, isAdm });

    return res.status(201).json(user);
  } catch (error) {
    handleError(error, res);
  }
};

export default createUserController;
