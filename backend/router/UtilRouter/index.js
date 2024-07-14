const express = require("express");
const { body } = require("express-validator");
const {
  WordGetterController,
} = require("../../controller/WordGetterController");
const router = express.Router();

router.post(
  "/getWords",
  body("wordAmount").isInt({ min: 1, max: 100000 }),
  body("maxWordHardness").isFloat({ min: 0, max: 1 }),
  WordGetterController.GetWords
);

module.exports = router;
