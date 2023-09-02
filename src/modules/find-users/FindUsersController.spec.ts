import { app } from "../../app";
import request from "supertest";
describe("Find Users Controller unit tests", () => {
  it("should return status 200", async () => {
    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
  });

  it("should return an array", async () => {
    const response = await request(app).get("/api/users");

    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("should accept query string", async () => {
    const response = await request(app).get("/api/users").query({ q: "john" });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});
