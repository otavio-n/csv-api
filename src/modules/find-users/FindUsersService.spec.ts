import { userListExample } from "../../repositories/in-memory/UserListExample";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepositories";
import { FindUsersService } from "./FindUsersService";

describe("Find users unit tests", () => {
  let usersRepository: IUsersRepository;
  let findUsersService: FindUsersService;

  beforeAll(() => {
    usersRepository = new UsersRepositoryInMemory();
    findUsersService = new FindUsersService(usersRepository);
  });

  it("should find all users without query", async () => {
    const users = await findUsersService.execute();
    expect(users).toBe(userListExample);
  });

  it("should find users in the same country", async () => {
    const query = "France";

    const usersFromQuery = userListExample.filter((user) =>
      user.country.includes(query)
    );
    const users = await findUsersService.execute(query);

    expect(users).toStrictEqual(usersFromQuery);
  });

  it("should find the same users for querys with upper, lower, and mixed case", async () => {
    const queryLowerCase = "john";
    const queryUpperCase = "JOHN";
    const queryMixed = "JohN";

    const usersLowerCase = await findUsersService.execute(queryLowerCase);
    const usersUpperCase = await findUsersService.execute(queryUpperCase);
    const usersMixed = await findUsersService.execute(queryMixed);

    expect(usersLowerCase).toStrictEqual(usersUpperCase);
    expect(usersLowerCase).toStrictEqual(usersMixed);
  });
});
