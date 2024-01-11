const express = require("express");
const router = express.Router();
const userController = require("../backend/controllers/userController");

router.get("/users", userController.getUser);
router.get("/user/create", userController.getCreate);
router.post("/user/create", userController.postCreate);
router.get("/user/edit/:id", userController.getEdit);
router.post("/user/edit/:id", userController.postEdit);
router.get("/user/delete/:id", userController.getDelete);
router.post("/user/delete/:id", userController.postDelete);
router.get("/user/details/:id", userController.getDetails);
    
module.exports = router;
