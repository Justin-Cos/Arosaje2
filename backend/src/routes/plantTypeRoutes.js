const express = require('express');
const plantsTypeController = require('../controllers/plantTypeController');

const router = express.Router();

router.get('/', plantsTypeController.getAllPlantTypes);
router.get('/:id', plantsTypeController.getPlantTypeById);
router.post('/', plantsTypeController.createPlantType);
router.put('/:id', plantsTypeController.updatePlantTypeById);
router.delete('/:id', plantsTypeController.deletePlantTypeById);

module.exports = router;
