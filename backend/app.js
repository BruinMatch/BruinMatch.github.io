const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");

const { Router } = require("express");
const router = Router();

// Creating app
const app = express();
app.use(bodyParser.json());

// Mongoose Schema
const inputSchema = new mongoose.Schema({
  name: { type: String, required: true },
  favoriteColor: { type: String, required: true },
  idealDate: { type: String, required: false },
  crushName: { type: String, required: false },
});

// Mongoose model
const Input = mongoose.model("Input", inputSchema);

// Controller
const createInput = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation failed", errors: errors.array() });
  }

  try {
    const { name, favoriteColor, idealDate, crushName } = req.body;
    const input = new Input({ name, favoriteColor, idealDate, crushName });
    await input.save();
    res.status(201).json({ message: "Input saved successfully", input });
  } catch (error) {
    res.status(500).json({ message: "Error saving input", error });
  }
};

// Routes
router.post(
  "/",
  [
    check("name")
      .isLength({ min: 1, max: 100 })
      .withMessage("Name must be between 1 and 100 characters"),
    check("favoriteColor")
      .isLength({ min: 1, max: 100 })
      .withMessage("Favorite color must be between 1 and 100 characters"),
    check("idealDate")
      .isLength({ min: 1, max: 100 })
      .withMessage("Ideal date must be between 1 and 100 characters"),
    check("crushName")
      .isLength({ min: 1, max: 100 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
  ],
  createInput
);

app.use("/add-post", router);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wi7zg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
