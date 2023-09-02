import { Request, Response } from "express";
import { FindUsersService } from "./FindUsersService";

class FindUsersController {
  constructor(private findUsers: FindUsersService) {}

  async handle(request: Request, response: Response) {
    const q = request.query.q as string;
    const users = await this.findUsers.execute(q);

    return response.json(users);
  }
}

export { FindUsersController };
