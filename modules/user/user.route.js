const { userModel } = require('./../../DB/model/user.model');
const userController = require('./controller/user.controller');

const auth = require('../../middleware/auth');

const router = require('express').Router();


router.get('/', userController.getAllUsers);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/profile', auth(), userController.profile);

module.exports = router;