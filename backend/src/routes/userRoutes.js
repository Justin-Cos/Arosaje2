const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: './uploads/profile_pictures',
});
const upload = multer({storage});
//API
router.get('/', userController.getAllUsers);
router.get('/botanist', userController.getAllBotanists);
router.get('/search', userController.getUsersNameLike);
router.get('/:id', userController.getUserById);
router.post('/register',upload.single('image_file'), userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

module.exports = router;
