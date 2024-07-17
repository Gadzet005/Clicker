const express = require('express');
const { body } = require('express-validator')
const gameController = require('../../controller/GameController.js')
const authMiddleware = require('../../middleware/authMiddleware.js')
const router = express.Router();


router.post('/type',
    //authMiddleware,
    body('userId').isString(),
    body('success').isBoolean(),
    body('completeWord').isBoolean(),
    gameController.type
);



router.post('/getProfile',
    //authMiddleware,
    gameController.getProfile
)


module.exports = router;