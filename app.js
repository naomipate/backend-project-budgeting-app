const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
let budgetController = require("./controllers/budgetController");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello! Welcome to your Budget App!");
});

app.use("/transactions", budgetController);

app.get("*", (req, res) => {
  res.status(404).json({ message: "page not found" });
});

module.exports = app;
