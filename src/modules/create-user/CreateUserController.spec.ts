import { app } from "../../app";
import request from "supertest";
describe("Create User Controller unit tests", () => {
  it("should return status 201", async () => {
    const response = await request(app).post("/api/users").send({
      name: "James Mike Johnson",
      city: "Paris",
      country: "France",
      favorite_sport: "Tennis",
    });

    expect(response.status).toBe(201);
  });
});
