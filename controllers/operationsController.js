// import { createOperation } from "../services/operationService.js";
import { findUserById } from "../services/userService.js";
import {
  generateRandomString,
  checkType,
  handleAddition,
  handleSubtraction,
  handleMultiplication,
  handleDivision,
  handleSquareRoot,
} from "../services/operationService.js";
import { db } from "../utils/db.js";
import { decodeAccessToken } from "../utils/jwt.js";
import { OperationType } from "@prisma/client";

export const operationHandler = async (req, res, next) => {
  try {
    const { operationType, value1, value2 } = req.body;
    const cost = 100;
    const { authorization } = req.headers;

    if (
      typeof value1 !== "number" ||
      typeof value2 !== "number" ||
      !checkType(OperationType, operationType)
    ) {
      return res.status(400).json({ error: "Invalid parameters" });
    }

    const payloadToken = decodeAccessToken(req);
    const userId = payloadToken.userId;
    const user = await findUserById(userId);
    let balance = user.balance;

    if (balance < cost) {
      return res
        .status(200)
        .json({ result: "Balance is not enough to make an operation" });
    }

    let result;

    switch (operationType) {
      case "addition":
        result = handleAddition(value1, value2);
        break;
      case "substraction":
        result = handleSubtraction(value1, value2);
        break;
      case "multiplication":
        result = handleMultiplication(value1, value2);
        break;
      case "division":
        result = handleDivision(value1, value2);
        break;
      case "square_root":
        result = handleSquareRoot(value1);
        break;
      case "random_string":
        result = await generateRandomString();
        break;
      default:
        throw new Error("Invalid operation type");
    }

    balance = balance - cost;
    const amount = operationType === "random_string" ? 0 : result;

    await db.$transaction(async () => {
      const operation = await db.operation.create({
        data: {
          cost: cost,
          type: operationType.toUpperCase(),
        },
      });

      const newRecord = await db.record.create({
        data: {
          amount: amount,
          operationId: operation.id,
          userId: user.id,
          userBalance: balance,
          operationResponse: "success",
        },
      });

      const updatedUser = await db.user.update({
        where: { id: userId },
        data: { balance },
      });
    });

    return res.json({ result });
  } catch (error) {
    next(error);
  }
};
