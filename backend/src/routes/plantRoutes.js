const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plantController");
const multer = require("multer");
const middleware = require("../middleware");
const storage = multer.diskStorage({
    destination: './uploads/plants',
});

const upload = multer({storage});

//API
router.get('/', middleware.authenticateToken, plantController.getAllPlants);
router.get('/:id', middleware.authenticateToken, plantController.getPlantById);
router.get('/user/:user_id', middleware.authenticateToken, plantController.getAllPlantsFromUser);
router.post('/', middleware.authenticateToken, upload.single('image_file'), plantController.createPlant);
router.put('/:id', middleware.authenticateTokenAdminOnly, plantController.updatePlant);
router.delete('/:id', middleware.authenticateTokenAdminOnly, plantController.deletePlant);

module.exports = router;
