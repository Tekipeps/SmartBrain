const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const users = [
  {
    email: "test@gmail.com",
    name: "Test",
    password: "test",
  },
  {
    email: "tekipeps@gmail.com",
    name: "Tekipeps",
    password: "tekipeps",
  },
];

(async () => {
  try {
    const promises = users.map(async (user) => {
      const hashedPass = await bcrypt.hash(user.password, 10);
      return prisma.user.create({
        data: {
          ...user,
          password: hashedPass,
        },
      });
    });
    const result = await Promise.all(promises);
    console.log(result);
  } catch (error) {
    prisma.$disconnect();
  }
})();
