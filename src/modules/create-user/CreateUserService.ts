import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepositories";

interface IUserBody {
  name: string;
  city: string;
  country: string;
  favorite_sport: string;
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    city,
    country,
    favorite_sport,
  }: IUserBody): Promise<User> {
    const userAlreadyExists = await this.usersRepository.exists(name);

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const user = User.create({ name, city, country, favorite_sport });
    const userCreated = await this.usersRepository.create(user);
    return userCreated;
  }
}

export { CreateUserService };
