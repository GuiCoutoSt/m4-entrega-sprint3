import { Request, Response } from "express";
import readDvdsService from "../../services/dvd/readDvds.service";

const readDvdsController = async (req: Request, res: Response) => {
  try {
    const dvds = await readDvdsService();

    return res.status(200).json({ dvds: dvds });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export default readDvdsController;
