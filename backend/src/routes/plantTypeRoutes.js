const express = require('express');
const plantsTypeController = require('../controllers/plantTypeController');
const middleware = require("../middleware");

const router = express.Router();

router.get('/', middleware.authenticateToken, plantsTypeController.getAllPlantTypes);
router.get('/:id', middleware.authenticateToken, plantsTypeController.getPlantTypeById);
router.post('/', middleware.authenticateToken, plantsTypeController.createPlantType);
router.put('/:id', middleware.authenticateToken, plantsTypeController.updatePlantTypeById);
router.delete('/:id', middleware.authenticateToken, plantsTypeController.deletePlantTypeById);

module.exports = router;
