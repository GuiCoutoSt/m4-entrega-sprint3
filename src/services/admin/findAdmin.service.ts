import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

const findAdminService = async (payload: any) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { email: payload.email },
  });

  return user;
};

export default findAdminService;
