import { Router } from "express";

import verifyAuthTokenMW from "../middlewares/verifyAuthToken.middleware";
import verifyAdminTokenMW from "../middlewares/verifyAdmin.middleware";

import createDvdController from "../controllers/dvd/createDvd.controller";
import readDvdsController from "../controllers/dvd/readtDvds.controller";
import buyDvdController from "../controllers/dvd/buyDvd.controller";

const routes = Router();

export const dvdRoutes = () => {
  routes.post(
    "/register",
    verifyAuthTokenMW,
    verifyAdminTokenMW,
    createDvdController
  );

  routes.get("/", readDvdsController);

  routes.post("/buy/:id", verifyAuthTokenMW, buyDvdController);

  return routes;
};
