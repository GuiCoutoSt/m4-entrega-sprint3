import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Cart } from "../../entities/cart.entity";
import { Dvd } from "../../entities/dvd.entity";
import { Stock } from "../../entities/stock.entity";
import { AppError } from "../../errors/appError";

const buyDvdService = async (dvdId: string, payload: any, quantity: number) => {
  const userRepository = AppDataSource.getRepository(User);
  const cartRepository = AppDataSource.getRepository(Cart);
  const dvdRepository = AppDataSource.getRepository(Dvd);

  const cartExist = await cartRepository.findOne({
    where: {
      newUser: {
        email: payload.email,
      },
    },
  });

  if (cartExist) {
    throw new AppError(409, "Cart already exists");
  }

  const dvds = await dvdRepository.find();
  const dvd = dvds.find((d) => d.id === dvdId);

  if (!dvd) {
    throw new AppError(404, "dvd not found");
  }

  const users = await userRepository.find();
  const user = users.find((u) => u.email === payload.email);

  if (dvd.stock.quantity < quantity) {
    throw new AppError(
      422,
      `current stock: ${dvd.stock.quantity}, received demand: ${quantity}`
    );
  }

  const cart = new Cart();
  cart.total = dvd.stock.price * quantity;
  cart.paid = false;
  cart.dvd = dvd;
  cart.newUser = user;
  await cartRepository.save(cart);

  return {
    cart,
  };
};

export default buyDvdService;
