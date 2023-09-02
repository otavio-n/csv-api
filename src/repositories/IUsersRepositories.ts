import { User } from "../entities/User";

interface IUsersRepository {
  create(user: User): Promise<User>;
  exists(name: string): Promise<boolean>;
}

export { IUsersRepository };
