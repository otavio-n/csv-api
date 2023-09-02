import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { FindUsersController } from "./FindUsersController";
import { FindUsersService } from "./FindUsersService";

export const findUsersFactory = () => {
  const usersRepository = new UsersRepositoryInMemory(); //TODO: sqlite
  const findUsers = new FindUsersService(usersRepository);
  const findUsersController = new FindUsersController(findUsers);
  return findUsersController;
};
