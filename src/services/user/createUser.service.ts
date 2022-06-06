import { User } from "../../entities/user.entity";
import { hash } from "bcrypt";
import { AppDataSource } from "../../data-source";
import { ICreateUser, IResponseUser } from "../../interfaces/user/index";
import { AppError } from "../../errors/appError";
import { Cart } from "../../entities/cart.entity";

const createUserService = async ({
  name,
  email,
  password,
  isAdm,
}: ICreateUser): Promise<Partial<IResponseUser>> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const foundUser = users.find((user) => user.email === email);

  if (foundUser !== undefined) {
    throw new AppError(409, "User already exists");
  }

  const hashedPassword = await hash(password, 10);

  const user = new User();
  user.name = name;
  user.email = email.toLowerCase();
  user.password = hashedPassword;
  user.isAdm = isAdm || false;

  await userRepository.save(user);

  const supportObject = {};

  const responseUser: User = Object.assign(supportObject, user);

  delete responseUser["password"];

  return responseUser;
};

export default createUserService;
