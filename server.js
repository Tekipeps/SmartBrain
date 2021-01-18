const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("SmartBrain API");
});

app.post("/signin", (req, res) => {
  res.send({ msg: "working signing" });
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
