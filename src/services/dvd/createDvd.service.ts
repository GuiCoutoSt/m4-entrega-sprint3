import { Request } from "express";
import { Dvd } from "../../entities/dvd.entity";
import { Stock } from "../../entities/stock.entity";
import { AppError } from "../../errors/appError";
import { AppDataSource } from "../../data-source";

interface IDvdCreate {
  name: string;
  duration: string;
  quantity: number;
  price: number;
}

const createDvdService = async ({
  name,
  duration,
  quantity,
  price,
}: IDvdCreate): Promise<Dvd> => {
  const dvdRepository = AppDataSource.getRepository(Dvd);
  const stockRepository = AppDataSource.getRepository(Stock);

  const stock: Stock = new Stock();
  stock.quantity = quantity;
  stock.price = price;

  stockRepository.create(stock);
  await stockRepository.save(stock);

  const dvd: Dvd = new Dvd();
  dvd.name = name;
  dvd.duration = duration;
  dvd.stock = stock;

  dvdRepository.create(dvd);
  await dvdRepository.save(dvd);

  return dvd;
};

export default createDvdService;
