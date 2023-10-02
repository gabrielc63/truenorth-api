import { PrismaClient } from "@prisma/client";

// const db = new PrismaClient();
const db = global.prisma || new PrismaClient();

// Trick for code reload
if (process.env.NODE_ENV !== "production") global.prisma = db;

// export { db };
export { db };
