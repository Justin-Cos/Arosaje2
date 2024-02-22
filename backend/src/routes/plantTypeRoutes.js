const express = require('express');
const plantsTypeController = require('../controllers/plantTypeController');
const middleware = require("../middleware");

const router = express.Router();

router.get('/', middleware.authenticateToken, plantsTypeController.getAllPlantTypes);
router.get('/:id', middleware.authenticateToken, plantsTypeController.getPlantTypeById);
router.post('/', middleware.authenticateTokenAdminOnly, plantsTypeController.createPlantType);
router.put('/:id', middleware.authenticateTokenAdminOnly, plantsTypeController.updatePlantTypeById);
router.delete('/:id', middleware.authenticateTokenAdminOnly, plantsTypeController.deletePlantTypeById);

module.exports = router;
