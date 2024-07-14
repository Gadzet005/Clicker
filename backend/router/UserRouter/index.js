const express = require('express');
const { body } = require('express-validator')
const userController = require('../../controller/UserController.js')
const router = express.Router();


router.post('/register',
    body('email').isEmail(),
    body('name').isLength({min: 1, max: 20}),
    body('password').isLength({min: 5, max: 32}),
    userController.register
);

router.post('/login',
    body('email').isEmail(),
    body('password').isLength({min: 5, max: 32}),
    userController.login
);
router.get('/logout', userController.logout);
router.get('/refreshToken', userController.refresh);

module.exports = router;