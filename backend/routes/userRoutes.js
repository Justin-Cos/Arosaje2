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

router.get("/form", userController.getUser);
router.get("/form/create", userController.getCreate);
router.post("/form/create", userController.postCreate);
router.get("/form/edit/:id", userController.getEdit);
router.post("/form/edit/:id", userController.postEdit);
router.get("/form/delete/:id", userController.getDelete);
router.post("/form/delete/:id", userController.postDelete);
router.get("/form/details/:id", userController.getDetails);

module.exports = router;
