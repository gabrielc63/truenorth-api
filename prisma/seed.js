import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  prisma.user.deleteMany({});
  const password = bcrypt.hashSync("abc123", 12);
  const gabriel = await prisma.user.upsert({
    where: { username: "gabrielc" },
    update: {},
    create: {
      username: "gabrielc",
      password: password,
    },
  });

  console.log({ gabriel });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
