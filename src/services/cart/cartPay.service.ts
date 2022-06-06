import { AppDataSource } from "../../data-source";
import { Cart } from "../../entities/cart.entity";
import { Stock } from "../../entities/stock.entity";
import { AppError } from "../../errors/appError";

const cartPayService = async (payload: any) => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const stockRepository = AppDataSource.getRepository(Stock);
  const carts = await cartRepository.find();
  const cart = carts.find((c) => c.newUser.email === payload.email);

  if (!cart) {
    throw new AppError(404, "Cart not found");
  }

  cart.paid = true;
  cart.dvd.stock.quantity -= cart.total / cart.dvd.stock.price;

  await cartRepository.save(cart);
  await stockRepository.save(cart.dvd.stock);

  return cart;
};

export default cartPayService;
