import { Request, Response } from "express";
import { handleError } from "../../errors/appError";
import buyDvdService from "../../services/dvd/buyDvd.service";
import { tokenExtractor } from "../../utils";

const buyDvdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const token = req.headers.authorization;

    const cart = await buyDvdService(id, tokenExtractor(token), quantity);

    return res.status(201).json(cart);
  } catch (error) {
    handleError(error, res);
  }
};

export default buyDvdController;
