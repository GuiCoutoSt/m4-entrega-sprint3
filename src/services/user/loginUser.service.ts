import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/user";

import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

dotenv.config();

const loginUserService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const user: User = await userRepository.findOne({
    where: { email: email },
  });

  if (!user) {
    throw new Error("Wrong Email/Password");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new AppError(401, "Wrong Email/Password");
  }

  const token: string = jwt.sign(
    { email: user.email },
    process.env.SECRET_KEY,
    {
      expiresIn: process.env.EXPIRES_IN,
    }
  );

  return token;
};

export default loginUserService;
