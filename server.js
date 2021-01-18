const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Welcome to SmartBrain API!");
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ msg: "`email`, `password` and `name` is required" });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: bcrypt.hashSync(password, 10),
      },
    });

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "2 days",
      }
    );
    res.send({ user, token });
  } catch (error) {
    console.log(error);
  }
});

app.post("/register", (req, res) => {
  res.json({ msg: "working register" });
});

app.get("/profile/:id", (req, res) => {
  res.json({ msg: "user profile" });
});

app.put("/image", (req, res) => {
  res.json({ msg: "incremeted entries" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app is running on port: ${PORT}`);
});
