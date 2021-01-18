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

const seed = async () => {
  try {
    const promises = users.map((user) =>
      prisma.user.create({
        data: {
          ...user,
          password: bcrypt.hashSync(user.password, 10),
        },
      })
    );
    const result = await Promise.all(promises);
    console.log(result);
    prisma.$disconnect();
  } catch (error) {
    console.log(error);
  }
};
seed();
