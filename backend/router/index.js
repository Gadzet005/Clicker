const express = require('express');
const userRouter = require('./UserRouter')

const router = express.Router();

router.use('/users', userRouter);

module.exports = router;