import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // const user = await prisma.user.create({
  //     data: {
  //         name: "Alice",
  //         email: "a@a.com",
  //         posts: {
  //             create: { title: "Hello World" },

  //         }

  //     }
  // })
  const allUsers = await prisma.user.findMany({
    where: { name: "Alice" },
    orderBy: { name: "asc" },
    take: 10,
    skip: 2,
  });
  console.log(allUsers);
}

main()
  .catch((e) => {
    console.error(e.messqge);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
