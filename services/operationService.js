import { db } from "../utils/db.js";
import RandomOrg from "random-org";

function createOperation(type, cost) {
  return db.operation.create({
    data: {
      type: type,
      cost: cost,
    },
  });
}

async function generateRandomString() {
  const availableCharacters = "abcdefghijopqltuvwxyz";
  const randomApiKey = process.env.RANDOM_API_KEY;
  const random = new RandomOrg({
    apiKey: randomApiKey,
  });
  const randomString = await random.generateStrings({
    n: 1,
    length: 12,
    characters: availableCharacters,
  });
  return randomString.random.data[0];
}

function checkType(types, param_type) {
  return Object.values(types).some(
    (value) => value === param_type.toUpperCase()
  );
}

const handleAddition = (param1, param2) => {
  return param1 + param2;
};

const handleSubtraction = (param1, param2) => {
  return param1 - param2;
};

const handleMultiplication = (param1, param2) => {
  return param1 * param2;
};

const handleDivision = (param1, param2) => {
  if (param2 === 0) {
    throw new Error("Division by zero");
  }
  return param1 / param2;
};

const handleSquareRoot = (param1) => {
  if (param1 < 0) {
    throw new Error("Negative value for square root");
  }
  return Math.sqrt(param1);
};

export {
  createOperation,
  generateRandomString,
  checkType,
  handleAddition,
  handleSubtraction,
  handleMultiplication,
  handleDivision,
  handleSquareRoot,
};
