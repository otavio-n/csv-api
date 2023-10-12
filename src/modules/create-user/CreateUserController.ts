import { Request, Response } from "express";
import { CreateUserService } from "./CreateUserService";

class CreateUserController {
  constructor(private createUser: CreateUserService) {}

  async handle(request: Request, response: Response) {
    await this.createUser.execute(request.body);
    return response.sendStatus(201);
  }
}

export { CreateUserController };
