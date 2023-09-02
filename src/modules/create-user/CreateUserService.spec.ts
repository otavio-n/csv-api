import { User } from "../../entities/User";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepositories";
import { CreateUserService } from "./CreateUserService";

describe("Create user unit tests", () => {
  let usersRepository: IUsersRepository;
  let createUserService: CreateUserService;

  beforeAll(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(usersRepository);
  });

  it("should create a new user", async () => {
    const userData: User = {
      name: "Test Name",
      city: "Test City",
      country: "Test Country",
      favorite_sport: "Test sport",
    };

    const user = await createUserService.execute(userData);

    expect(user).toHaveProperty("id");
    expect(user.name).toBe("Test Name");
    expect(user.city).toBe("Test City");
    expect(user.country).toBe("Test Country");
    expect(user.favorite_sport).toBe("Test sport");
  });

  it("should not be able to create an existing user", async () => {
    const userData: User = {
      name: "Test Existing Name",
      city: "Test City",
      country: "Test Country",
      favorite_sport: "Test sport",
    };

    await createUserService.execute(userData);

    await expect(createUserService.execute(userData)).rejects.toThrow(
      "User already exists!"
    );
  });
});
