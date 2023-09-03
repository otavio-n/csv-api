import { User } from "../../entities/User";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepositories";
import { CreateUserService } from "../create-user/CreateUserService";
import { FindUsersService } from "../find-users/FindUsersService";
import { CreateCsvService } from "./CreateCsvService";

describe("Create csv unit tests", () => {
  let usersRepository: IUsersRepository;
  let createUserService: CreateUserService;
  let findUsersService: FindUsersService;
  let createCsvService: CreateCsvService;

  beforeAll(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(usersRepository);
    findUsersService = new FindUsersService(usersRepository);
    createCsvService = new CreateCsvService(createUserService);
  });

  it("should create users from csv", async () => {
    const csvBody = {
      file:
        "name,city,country,favorite_sport\n" +
        "Karen Lee,Tokyo,Japan,Swimming\n" +
        "Tom Brown,Sydney,Australia,Running\n" +
        "Emma Wilson,Berlin,Germany,Basketball",
    };
    const names = ["Karen Lee", "Tom Brown", "Emma Wilson"];

    await createCsvService.execute(csvBody);
    const users: Array<User> = await findUsersService.execute();
    const foundUsers = users.filter((user) => names.includes(user.name));

    expect(foundUsers.length).toBe(3);
  });

  it("should throw error for semicolon separeted data", async () => {
    const csvBody = {
      file:
        "name;city;country;favorite_sport\n" +
        "Karen Lee;Tokyo;Japan;Swimming\n",
    };
    await expect(createCsvService.execute(csvBody)).rejects.toThrow(
      "Invalid csv format"
    );
  });

  it("should throw error for invalid csv", async () => {
    const csvBody = {
      file: "name,city,country,\n" + "Karen Lee,Tokyo,Japan,Swimming\n",
    };
    await expect(createCsvService.execute(csvBody)).rejects.toThrow(
      "Invalid csv format"
    );
  });

  it("should not create user without name", async () => {
    const numberOfUsersBefore = (await findUsersService.execute()).length;
    const csvBody = {
      file: "name,city,country,favorite_sport\n" + ",Tokyo,Japan,Swimming",
    };

    await createCsvService.execute(csvBody)
    const numberOfUsersAfter = (await findUsersService.execute()).length;

    expect(numberOfUsersBefore).toBe(numberOfUsersAfter)
  });
});
