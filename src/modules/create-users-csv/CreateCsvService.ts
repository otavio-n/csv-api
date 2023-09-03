import { User } from "../../entities/User";

interface IUserBody {
  name: string;
  city: string;
  country: string;
  favorite_sport: string;
}

interface ICreateUserService {
  execute({ name, city, country, favorite_sport }: IUserBody): Promise<User>;
}

interface ICsvBody {
  file: string;
}

class CreateCsvService {
  constructor(private createUserService: ICreateUserService) {}

  async execute(csvBody: ICsvBody) {
    const csvString: string = csvBody.file;
    const usersFromCsv: User[] = this.csvToJson(csvString);

    for (const userFromCsv of usersFromCsv) {
      try {
        const user = User.create(userFromCsv);
        if (!user.name) throw "User without name";
        await this.createUserService.execute(user);
      } catch (error) {
        console.warn(error);
        continue;
      }
    }
  }

  csvToJson(csvString: string): IUserBody[] {
    const rows = csvString.split("\n");
    const headers: Array<string> = this.getHeaders(rows);
    rows.shift();
    const result = this.attributeRowsWithHeaders(rows, headers);

    return result;
  }

  getHeaders(rowsArray: Array<string>): Array<string> {
    const headers = rowsArray[0].split(",");
    if (JSON.stringify(headers) !== JSON.stringify(User.getProperties())) {
      throw new Error("Invalid csv format");
    }
    return headers;
  }

  attributeRowsWithHeaders(
    rows: Array<string>,
    headers: Array<string>
  ): IUserBody[] {
    const result: IUserBody[] = [];
    for (const row of rows) {
      const obj: IUserBody = {
        name: "",
        city: "",
        country: "",
        favorite_sport: "",
      };

      const currentline = row.split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j] as keyof IUserBody] = currentline[j];
      }

      result.push(obj);
    }
    return result;
  }
}

export { CreateCsvService };
