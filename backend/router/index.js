const express = require("express");
const userRouter = require("./UserRouter");
const utilRouter = require("./UtilRouter");

const router = express.Router();

router.use("/users", userRouter);
router.use("/", utilRouter);

module.exports = router;
