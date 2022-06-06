import { Request, Response } from "express";
import createDvdService from "../../services/dvd/createDvd.service";

const createDvdController = async (req: Request, res: Response) => {
  try {
    const dvd = await createDvdService(req.body);

    return res.status(201).json(dvd);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default createDvdController;
