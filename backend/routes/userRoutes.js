const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//API
router.get('/', userController.getAllUsers);
router.get('/botanist', userController.getAllBotanists);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

module.exports = router;
