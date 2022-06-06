import { AppDataSource } from "../../data-source";
import { Dvd } from "../../entities/dvd.entity";

const readDvdsService = async () => {
  const dvdRepository = AppDataSource.getRepository(Dvd);
  const dvds = await dvdRepository.find();

  return dvds;
};

export default readDvdsService;
