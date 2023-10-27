import request from "supertest";
import bcrypt from "bcrypt";
import app from "../app.js";
import { db } from "../utils/db.js";

describe("Auth endpoints", () => {
  let testUser;
  let userAccessToken;

  beforeAll(async () => {
    await db.record.deleteMany({});
    await db.operation.deleteMany({});
    await db.refreshToken.deleteMany({});
    await db.user.deleteMany({});

    const password = bcrypt.hashSync("password123", 12);
    testUser = await db.user.create({
      data: {
        username: "testuser1",
        password: password,
      },
    });
  });

  it("should respond with a JWT token on successful login", async () => {
    const response = await request(app)
      .post("/api/v1/login")
      .send({ username: testUser.username, password: "password123" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    userAccessToken = response.body.accessToken;
  });

  it("should respond with an error if no credentials are provided", async () => {
    const response = await request(app).post("/api/v1/operations").send({});
    expect(response.statusCode).toBe(401);
  });

  it("should respond with a result for an operation if credentials are provided", async () => {
    const response = await request(app)
      .post("/api/v1/operations")
      .send({
        value1: 1,
        value2: 3,
        operationType: "addition",
      })
      .set("Authorization", `Bearer ${userAccessToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("result");
    expect(response.body.result).toBe(4);
  });
});
