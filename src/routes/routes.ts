import { Router } from "express";
import { findUsersFactory } from "../modules/find-users/FindUsersFactory";
import { createCsvFactory } from "../modules/create-users-csv/CreateCsvFactory";

const routes = Router();

routes.get("/api/users", (request, response) =>
    findUsersFactory().handle(request, response)
);

routes.post("/api/files", (request, response) =>
    createCsvFactory().handle(request, response)
);


export { routes };
