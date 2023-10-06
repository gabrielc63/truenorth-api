// const request = require("supertest");
import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
// import authController from "../controllers/authController.js";
import app from "../app.js";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

// process.env.NODE_ENV = "test";
// config({ path: "../.env.test" });

// app.post("/api/v1/login", authController.login);

describe("POST /login", () => {
  let testUser;

  beforeEach(async () => {
    // Clear the test database before each test
    // await prisma.user.deleteMany({});
    // const deleteUsers = await prisma.user.deleteMany({});
    // console.log("DELETE USERS ===========================");
    // console.log(deleteUsers);
  });

  beforeAll(async () => {
    const deleteUsers = await prisma.user.deleteMany({});
    // Create a test user
    testUser = await prisma.user.create({
      data: {
        username: "testuser1",
        password: "password123",
      },
    });
  });

  it("should respond with a JWT token on successful login", async () => {
    console.log(process.env.DATABASE_URL);
    const response = await request(app)
      .post("/api/v1/login")
      .send({ username: testUser.username, password: testUser.password }); // Assume these credentials are valid

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");

    // Optionally, verify the token
    const decoded = jwt.verify(response.body.token, "your_jwt_secret_key");
    expect(decoded.email).toBe("test@example.com");
  });

  it("should respond with an error if no credentials are provided", async () => {
    const response = await request(app).post("/api/v1/login").send({});

    expect(response.statusCode).toBe(400); // Adjust the status code based on your implementation
  });
});
