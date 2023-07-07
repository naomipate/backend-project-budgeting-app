const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let budgetModel = require("../models/budgetModel");

router.get("/", (req, res) => {
  res.json(budgetModel);
});

router.get("/get-item-by-id/:id", (req, res) => {
  const { id } = req.params;

  const match = budgetModel.find((item) => item.id === id);

  if (!match) {
    res.status(404).json({
      status: false,
      message: "Id not found",
    });
  } else {
    res.json({ status: true, data: match });
  }
});

router.post("/create-budget-item", (req, res) => {
  const { budgetItem } = req.body;

  if (!budgetItem) {
    res.status(400).json({
      status: false,
      message: "You cannot create an empty budget item",
    });
  } else {
    const newBudgetItem = {
      id: uuidv4(),
      todo,
      done: false,
    };

    budgetModel.push(newBudgetItem);

    res.status(201).json({ status: true, data: newBudgetItem });
  }
});

router.delete("/delete-budget-item-by-id/:id", (req, res) => {
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

    res.json({
      status: true,
      message: "success",
      data: foundBudgetItem,
    });
  }
});

router.put("/update-budget-item-by-id/:id", (req, res) => {
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

    res.json({ message: "success", status: true, data: newObj });
  }
});

module.exports = router;
