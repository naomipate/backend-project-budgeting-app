const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let budgetModel = require("../models/budgetModel");

// READ ONLY
router.get("/", (req, res) => {
  res.json(budgetModel);
});

// READ ONLY BY ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const match = budgetModel.find((item) => item.id === id);

  if (!match) {
    res.status(404).json({
      status: false,
      message: "Id not found",
    });
  } else {
    res.json(match);
  }
});

// CREATE NEW BUDGET ITEM
router.post("/", (req, res) => {
  const budgetItem = req.body;

  if (!budgetItem) {
    res.status(400).json({
      status: false,
      message: "You cannot create an empty budget item",
    });
  } else {
    const newBudgetItem = {
      id: uuidv4(),
      ...budgetItem,
    };
    console.log("This is working", newBudgetItem);
    budgetModel.push(newBudgetItem);

    res.status(201).json(newBudgetItem);
  }
});

// DELETE BUDGET ITEM BY ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  let foundIndex = budgetModel.findIndex((item) => item.id === id);

  if (foundIndex === -1) {
    res
      .status(404)
      .json({ status: false, message: "sorry, no todo with this id is found" });
  } else {
    let foundBudgetItem = budgetModel[foundIndex];

    let newBudget = budgetModel.filter((item) => item.id !== id);

    budgetModel = newBudget;

    res.json(foundBudgetItem);
  }
});

// UPDATE BUDGET ITEM BY ID
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const foundIndex = budgetModel.findIndex((item) => item.id === id);

  if (foundIndex === -1) {
    res.status(404).json({ status: false, message: "Id not found!" });
  } else {
    let foundBudgetItem = budgetModel[foundIndex];

    let newObj = {
      ...foundBudgetItem,
      ...req.body,
    };

    budgetModel.splice(foundIndex, 1, newObj);

    res.json(newObj);
  }
});

router.get("*", (req, res) => {
  res.status(404).json({ message: "page not found" });
});

module.exports = router;
