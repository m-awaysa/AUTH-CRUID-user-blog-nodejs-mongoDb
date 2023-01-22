const { userModel } = require('./../../DB/model/user.model');
const userController = require('./controller/auth.controller');

const auth = require('../../middleware/auth');

const router = require('express').Router();


router.post('/signup', userController.signup);
router.post('/signin', userController.signIn);

module.exports = router;