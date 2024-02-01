const express = require('express');
const addressController = require('../controllers/addressController');

const router = express.Router();

// Routes
router.get('/', addressController.getAllAddresses);
router.get('/:id', addressController.getAddressById);
router.post('/', addressController.createAddress);
router.put('/:id', addressController.updateAddressById);
router.delete('/:id', addressController.deleteAddressById);

module.exports = router;