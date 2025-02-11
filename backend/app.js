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
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  uclaemail: { type: String, required: true },
  academicyear: { type: String, required: true },
  gender: { type: String, required: true },
  sexuality: { type: String, required: true },
  qualities: { type: String, required: true },
  dealbreaker: { type: String, required: true },
  trust: { type: String, required: true },
  bplate: { type: String, required: true },
  dreams: { type: String, required: true },
  fear: { type: String, required: true },
  friendship: { type: String, required: true },
  andre: { type: String, required: true },
  lovelanguage: { type: String, required: true },
  humor: { type: String, required: true },
  perfectday: { type: String, required: true },
  hours: { type: String, required: true },
  evaluate: { type: String, required: true },
  quiz: { type: String, required: true },
  secret: { type: String, required: true },
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
    check("firstName").isLength({ min: 1, max: 100 }),

    check("lastName").isLength({ min: 1, max: 100 }),

    check("uclaemail").isLength({ min: 1, max: 100 }),

    check("academicyear").isLength({ min: 1, max: 50 }),

    check("gender").isLength({ min: 1, max: 50 }),

    check("sexuality").isLength({ min: 1, max: 100 }),

    check("qualities").isLength({ min: 1, max: 500 }),

    check("dealbreaker").isLength({ min: 1, max: 1000 }),

    check("trust").isLength({ min: 1, max: 1000 }),

    check("bplate").isLength({ min: 1, max: 1000 }),

    check("dreams").isLength({ min: 1, max: 1000 }),

    check("fear").isLength({ min: 1, max: 1000 }),

    check("friendship").isLength({ min: 1, max: 1000 }),

    check("andre").isLength({ min: 1, max: 1000 }),

    check("lovelanguage").isLength({ min: 1, max: 1000 }),

    check("humor").isLength({ min: 1, max: 1000 }),

    check("perfectday").isLength({ min: 1, max: 1000 }),

    check("hours").isLength({ min: 1, max: 1000 }),

    check("evaluate").isLength({ min: 1, max: 1000 }),

    check("quiz").isLength({ min: 1, max: 1000 }),

    check("secret").isLength({ min: 1, max: 1000 }),
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
