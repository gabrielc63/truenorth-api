import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { findUserByUsername, findUserById } from "../services/userService.js";
import { generateTokens } from "../utils/jwt.js";
import { addRefreshTokenToWhitelist } from "../services/authService.js";

// import { SECRET } from "../config.js";

export const signinHandler = async (req, res, next) => {
  try {
    // if (!userFound) return res.status(400).json({ message: "User Not Found" });

    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400);
      throw new Error("You must provide an email and a password.");
    }

    const existingUser = await findUserByUsername(username);

    if (!existingUser) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: existingUser.id,
    });

    // if (!matchPassword)
    //   return res.status(401).json({
    //     token: null,
    //     message: "Invalid Password",
    //   });

    // const token = jwt.sign({ id: userFound._id }, SECRET, {
    //   expiresIn: 86400, // 24 hours
    // });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};
