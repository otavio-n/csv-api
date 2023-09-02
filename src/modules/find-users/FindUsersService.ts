import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepositories";

class FindUsersService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(query?: string): Promise<User[]> {
    const allUsers = await this.usersRepository.findAll();
    if (!query) return allUsers;

    const allColumnsByQuery = (item: User): boolean => {
      const thisItem = Object.assign({}, item);
      delete thisItem.id;
      for (const value of Object.values(thisItem)) {
        if (value.toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
      }
      return false;
    };

    const foundUsers = allUsers.filter(allColumnsByQuery);
    return foundUsers;
  }
}

export { FindUsersService };
