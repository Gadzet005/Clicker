const express = require('express');
const userRouter = require('./UserRouter')
const gameRouter = require('./GameRouter')

const router = express.Router();

router.use('/users', userRouter);
router.use('/game', gameRouter)

module.exports = router;
