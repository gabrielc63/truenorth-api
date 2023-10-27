import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
// import authController from "../controllers/authController.js";
import app from "../app.js";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

describe("POST /login", () => {
  let testUser;

  beforeAll(async () => {
    const deleteUsers = await prisma.user.deleteMany({});
    testUser = await prisma.user.create({
      data: {
        username: "testuser1",
        password: "password123",
      },
    });
  });

  it("should respond with a JWT token on successful login", async () => {
    const response = await request(app)
      .post("/api/v1/login")
      .send({ username: testUser.username, password: testUser.password });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");

    const decoded = jwt.verify(response.body.token, "your_jwt_secret_key");
    expect(decoded.email).toBe("test@example.com");
  });

  it("should respond with an error if no credentials are provided", async () => {
    const response = await request(app).post("/api/v1/login").send({});

    expect(response.statusCode).toBe(400);
  });
});
