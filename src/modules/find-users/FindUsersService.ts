import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepositories";

class FindUsersService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(query: string): Promise<User[]> {
    const allUsers = await this.usersRepository.findAll();
    if (!query) return allUsers;

    const allColumnsByQuery = (item: User): boolean => {
      for (const value of Object.values(item)) {
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
