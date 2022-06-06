import { Router } from "express";

import verifyUserCreateMW from "../middlewares/verifyUserCreate.middleware";
import verifyUserLoginMW from "../middlewares/verifyUserLogin.middleware";
import verifyAdminCreateMW from "../middlewares/verifyAdminCreate.middleware";

import createUserController from "../controllers/user/createUser.controller";
import loginUserController from "../controllers/user/loginUser.controller";

const routes = Router();

export const userRoutes = () => {
  routes.post(
    "/register",
    verifyUserCreateMW,
    verifyAdminCreateMW,
    createUserController
  );

  // prettier-ignore
  routes.post(
    "/login", 
    verifyUserLoginMW, 
    loginUserController
  );

  return routes;
};
