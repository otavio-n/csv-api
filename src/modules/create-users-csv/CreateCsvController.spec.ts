import { app } from "../../app";
import request from "supertest";
describe("Create csv controller unit tests", () => {
  it("should return status 200 sending valid csv", async () => {
    const response = await request(app)
      .post("/api/files")
      .send({
        file:
          "name,city,country,favorite_sport\n" +
          "Karen Lee,Tokyo,Japan,Swimming\n" +
          "Tom Brown,Sydney,Australia,Running\n" +
          "Emma Wilson,Berlin,Germany,Basketball",
      });

    expect(response.status).toBe(201);
  });

  it("should return status 400 sending invalid csv", async () => {
    const response = await request(app)
      .post("/api/files")
      .send({
        file:
          "name,city,,favorite_sport\n" + "Karen Lee,Tokyo,Japan,Swimming\n",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid csv format");
  });

  it("should return status 400 sending empty body", async () => {
    const response = await request(app).post("/api/files").send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Missing "file" key');
  });
});
