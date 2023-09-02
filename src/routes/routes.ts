import { Router } from "express";
import { findUsersFactory } from "../modules/find-users/FindUsersFactory";

const routes = Router();

routes.get("/api/users", (request, response) =>
    findUsersFactory().handle(request, response)
);

export { routes };
