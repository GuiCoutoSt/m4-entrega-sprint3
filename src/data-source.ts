import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",

  url: process.env.DATABASE_URL,

  logging: false,
  synchronize: false,
  entities: ["./src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
});
