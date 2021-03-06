import { Express } from "express";
import { userRoutes } from "./user.routes";
import { dvdRoutes } from "./dvd.routes";
import { cartRoutes } from "./cart.routes";

export const appRoutes = (app: Express): void => {
  app.use("/api/users", userRoutes());
  app.use("/api/dvds", dvdRoutes());
  app.use("/api/carts", cartRoutes());
};
