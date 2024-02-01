const express = require('express');
const careSessionController = require('../controllers/careSessionController');

const router = express.Router();

// Routes
router.get('/', careSessionController.getAllCareSessions);
router.get('/previous', careSessionController.getPreviousCareSessions);
router.get('/active', careSessionController.getActiveCareSessions);
router.get('/next', careSessionController.getNextCareSessions);
router.get('/available', careSessionController.getAvailableSessions);
router.get('/:id', careSessionController.getCareSessionById);
router.post('/', careSessionController.createCareSession);
router.put('/:id', careSessionController.updateCareSessionById);
router.delete('/:id', careSessionController.deleteCareSessionById);

module.exports = router;
