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
      firstName,
      lastName,
      uclaemail,
      academicyear,
      gender,
      sexuality,
      qualities,
      dealbreaker,
      trust,
      bplate,
      dreams,
      fear,
      friendship,
      andre,
      lovelanguage,
      humor,
      perfectday,
      hours,
      evaluate,
      quiz,
      secret,
    } = req.body;
    const input = new Input({
      firstName,
      lastName,
      uclaemail,
      academicyear,
      gender,
      sexuality,
      qualities,
      dealbreaker,
      trust,
      bplate,
      dreams,
      fear,
      friendship,
      andre,
      lovelanguage,
      humor,
      perfectday,
      hours,
      evaluate,
      quiz,
      secret,
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
    check("firstName")
      .isLength({ min: 1, max: 100 })
      .withMessage("Name must be between 1 and 100 characters"),
    check("lastName")
      .isLength({ min: 1, max: 100 })
      .withMessage("Favorite color must be between 1 and 100 characters"),
    check("uclaemail")
      .isLength({ min: 1, max: 100 })
      .withMessage("Ideal date must be between 1 and 100 characters"),
    check("academicyear")
      .isLength({ min: 1, max: 50 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("gender")
      .isLength({ min: 1, max: 50 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("sexuality")
      .isLength({ min: 1, max: 100 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("qualities")
      .isLength({ min: 1, max: 500 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("dealbreaker")
      .isLength({ min: 1, max: 1000 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("trust")
      .isLength({ min: 1, max: 1000 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("bplate")
      .isLength({ min: 1, max: 1000 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("dreams")
      .isLength({ min: 1, max: 1000 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("fear")
      .isLength({ min: 1, max: 1000 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("friendship")
      .isLength({ min: 1, max: 1000 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("andre")
      .isLength({ min: 1, max: 1000 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("lovelanguage")
      .isLength({ min: 1, max: 1000 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("humor")
      .isLength({ min: 1, max: 1000 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("perfectday")
      .isLength({ min: 1, max: 1000 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("hours")
      .isLength({ min: 1, max: 1000 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("evaluate")
      .isLength({ min: 1, max: 1000 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("quiz")
      .isLength({ min: 1, max: 1000 })
      .withMessage("Secret crush must be between 1 and 100 characters"),
    check("secret")
      .isLength({ min: 1, max: 1000 })
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
