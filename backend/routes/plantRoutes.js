const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plantController");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: './uploads/plants',
});

const upload = multer({ storage });

//API
router.get('/', plantController.getAllPlants);
router.get('/:id', plantController.getPlantById);
router.post('/', upload.single('image_file'),plantController.createPlant);
router.put('/:id', plantController.updatePlant);
router.delete('/:id', plantController.deletePlant);

module.exports = router;
