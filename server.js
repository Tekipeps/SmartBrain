const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());

const nonSensitiveUser = {
  id: true,
  email: true,
  name: true,
  entries: true,
  joined: true,
};

app.get("/", (_req, res) => {
  res.send("Welcome to SmartBrain API!");
});

app.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ error: "`email`, `password` and `name` is required" });
    }
    const hashedPass = await bcrypt.hash(password);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPass,
      },
      select: nonSensitiveUser,
    });

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET
    );
    res.send({ user, token });
  } catch (error) {
    console.log(error);
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "`email` and `password` required" });
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({ error: "Email does not exist" });
    }
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      return res.status(401).json({ error: "password incorrect" });
    }
    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET
    );
    res.json({ token, user: { name: user.name, id: user.id } });
  } catch (error) {
    console.log(error);
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      select: nonSensitiveUser,
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: nonSensitiveUser,
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

app.put("/image", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "`id` is required" });
    }
    const { entries } = await prisma.user.findUnique({
      where: { id },
      select: { entries: true },
    });
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        entries: entries + 1,
      },
      select: nonSensitiveUser,
    });
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app is running on port: ${PORT}`);
});
