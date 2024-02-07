const express = require('express');
const addressController = require('../controllers/addressController');
const middleware = require("../middleware");

const router = express.Router();

// Routes
router.get('/', middleware.authenticateToken, addressController.getAllAddresses);
router.get('/:id', middleware.authenticateToken, addressController.getAddressById);
router.post('/', middleware.authenticateToken, addressController.createAddress);
router.put('/:id', middleware.authenticateToken, addressController.updateAddressById);
router.delete('/:id', middleware.authenticateToken, addressController.deleteAddressById);

module.exports = router;