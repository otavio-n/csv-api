import { Request, Response } from "express";
import { CreateCsvService } from "./CreateCsvService";

class CreateCsvController {
  constructor(private createCsv: CreateCsvService) {}

  async handle(request: Request, response: Response) {
    if (!request.body.file) {
      return response.status(400).send({ message: 'Missing "file" key' });
    }
    await this.createCsv.execute(request.body);

    return response.sendStatus(201);
  }
}

export { CreateCsvController };
