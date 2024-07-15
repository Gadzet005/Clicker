const express = require("express");
const { query } = require("express-validator");
const {
  WordGetterController,
} = require("../../controller/WordGetterController");
const router = express.Router();

router.get(
  "/getWords",
  query("wordAmount").isInt({ min: 1, max: 100000 }),
  query("maxWordHardness").isFloat({ min: 0, max: 1 }),
  WordGetterController.GetWords
);

module.exports = router;
