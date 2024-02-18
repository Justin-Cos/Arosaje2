const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: './uploads/profile_pictures',
});
const middleware = require("../middleware");
const upload = multer({storage});
//API
router.get('/', middleware.authenticateToken, userController.getAllUsers);
router.get('/botanist', middleware.authenticateToken, userController.getAllBotanists);
router.get('/search', middleware.authenticateToken, userController.getUsersNameLike);
router.get('/:id', middleware.authenticateToken, userController.getUserById);
router.put('/:id', middleware.authenticateToken, userController.updateUserById);
router.delete('/:id', middleware.authenticateToken, userController.deleteUserById);

//authent
router.post('/register',upload.single('image_file'), userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/update-token', middleware.authenticateToken, userController.updateToken);

module.exports = router;
