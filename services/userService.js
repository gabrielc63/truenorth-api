import bcrypt from "bcrypt";
import { db } from "../utils/db.js";

function findUserByUsername(username) {
  return db.user.findUnique({
    where: {
      username,
    },
  });
}

function createUserByEmailAndPassword(user) {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

function findUserById(id) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

export { findUserByUsername, findUserById, createUserByEmailAndPassword };
