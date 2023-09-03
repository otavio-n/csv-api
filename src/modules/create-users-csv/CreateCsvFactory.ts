import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserService } from "../create-user/CreateUserService";
import { CreateCsvController } from "./CreateCsvController";
import { CreateCsvService } from "./CreateCsvService";

export const createCsvFactory = () => {
  const usersRepository = new UsersRepositoryInMemory();
  const createUserService = new CreateUserService(usersRepository);
  const createCsv = new CreateCsvService(createUserService);
  const createCsvController = new CreateCsvController(createCsv);
  return createCsvController;
};
