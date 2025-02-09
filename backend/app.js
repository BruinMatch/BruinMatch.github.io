const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const cors = require("cors");
const { Router } = require("express");
const router = Router();

// Creating app
const app = express();

app.use(cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));

app.use(bodyParser.json());

// Mongoose Schema
const inputSchema = new mongoose.Schema({
  name: { type: String, required: true },
  favoriteColor: { type: String, required: true },
  idealDate: { type: String, required: true },
  crushName: { type: String, required: true },
  input5: { type: String, required: true },
  input6: { type: String, required: true },
  input7: { type: String, required: true },
  input8: { type: String, required: true },
  input9: { type: String, required: true },
  input10: { type: String, required: true },
  input11: { type: String, required: true },
  input12: { type: String, required: true },
  input13: { type: String, required: true },
  input14: { type: String, required: true },
  input15: { type: String, required: true },
  input15: { type: String, required: true },
  input16: { type: String, required: true },
  input17: { type: String, required: true },
  input18: { type: String, required: true },
  input19: { type: String, required: true },
  input20: { type: String, required: true },
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
    const {
      name,
      favoriteColor,
      idealDate,
      crushName,
      input5,
      input6,
      input7,
      input8,
      input9,
      input10,
      input11,
      input12,
      input13,
      input14,
      input15,
      input16,
      input17,
      input18,
      input19,
      input20,
    } = req.body;
    const input = new Input({
      name,
      favoriteColor,
      idealDate,
      crushName,
      input5,
      input6,
      input7,
      input8,
      input9,
      input10,
      input11,
      input12,
      input13,
      input14,
      input15,
      input16,
      input17,
      input18,
      input19,
      input20,
    });
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
    check("input5")
      .isLength({ min: 1, max: 100 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("input6")
      .isLength({ min: 1, max: 100 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("input7")
      .isLength({ min: 1, max: 100 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("input8")
      .isLength({ min: 1, max: 100 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("input9")
      .isLength({ min: 1, max: 100 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("input10")
      .isLength({ min: 1, max: 100 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("input11")
      .isLength({ min: 1, max: 100 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("input12")
      .isLength({ min: 1, max: 100 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("input13")
      .isLength({ min: 1, max: 100 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("input14")
      .isLength({ min: 1, max: 100 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("input15")
      .isLength({ min: 1, max: 100 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("input16")
      .isLength({ min: 1, max: 100 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("input17")
      .isLength({ min: 1, max: 100 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("input18")
      .isLength({ min: 1, max: 100 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("input19")
      .isLength({ min: 1, max: 100 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("input20")
      .isLength({ min: 1, max: 100 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
  ],
  createInput
);

app.use("/add-post", router);

// Production part
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wi7zg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
