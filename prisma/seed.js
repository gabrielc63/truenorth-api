import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const gabriel = await prisma.user.upsert({
    where: { username: "gabrielc" },
    update: {},
    create: {
      username: "gabrielc",
      password: "abc123",
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
