const express = require('express');
const careSessionController = require('../controllers/careSessionController');
const middleware = require("../middleware");

const router = express.Router();

// Routes
router.get('/previous', middleware.authenticateToken, careSessionController.getPreviousCareSessions);
router.get('/active', middleware.authenticateToken, careSessionController.getActiveCareSessions);
router.get('/next', middleware.authenticateToken, careSessionController.getNextCareSessions);
router.get('/available', middleware.authenticateToken, careSessionController.getAvailableSessions);
router.get('/nearby', middleware.authenticateToken, careSessionController.getNearbySessions);
router.get('/', middleware.authenticateToken, careSessionController.getAllCareSessions);
router.get('/:id', middleware.authenticateToken, careSessionController.getCareSessionById);
router.post('/', middleware.authenticateToken, careSessionController.createCareSession);
router.put('/:id', middleware.authenticateTokenAdminOnly, careSessionController.updateCareSessionById);
router.delete('/:id', middleware.authenticateTokenAdminOnly, careSessionController.deleteCareSessionById);

module.exports = router;
