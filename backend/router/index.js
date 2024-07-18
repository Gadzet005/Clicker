const express = require("express");
const userRouter = require("./UserRouter");
const gameRouter = require("./GameRouter");
const utilRouter = require("./UtilRouter");

const router = express.Router();

router.use("/users", userRouter);
router.use("/game", gameRouter);
router.use("/", utilRouter);

module.exports = router;
