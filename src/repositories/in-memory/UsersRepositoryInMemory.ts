import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepositories";
import { v4 as uuid } from "uuid";
import { userListExample } from "./UserListExample";

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = userListExample;

  async create(user: User): Promise<User> {
    Object.assign(user, {
      id: uuid(),
    });

    this.users.push(user);
    return user;
  }

  async exists(name: string): Promise<boolean> {
    const user = this.users.some((user) => user.name === name);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}

export { UsersRepositoryInMemory };
