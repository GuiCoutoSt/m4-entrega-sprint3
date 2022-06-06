import { Router } from "express";

import verifyAuthTokenMW from "../middlewares/verifyAuthToken.middleware";

import cartPayController from "../controllers/cart/cartPay.controller";

const routes = Router();

export const cartRoutes = () => {
  routes.put("/pay", verifyAuthTokenMW, cartPayController);

  return routes;
};
