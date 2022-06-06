import { Request, Response } from "express";
import { handleError } from "../../errors/appError";
import cartPayService from "../../services/cart/cartPay.service";
import { tokenExtractor } from "../../utils";

const cartPayController = (req: Request, res: Response) => {
  try {
    const cart = cartPayService(tokenExtractor(req.headers.authorization));

    return res.status(200).json(cart);
  } catch (error) {
    handleError(error, res);
  }
};

export default cartPayController;
