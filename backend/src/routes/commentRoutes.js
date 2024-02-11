const express = require('express');
const commentsController = require('../controllers/commentController');
const middleware = require("../middleware");

const router = express.Router();

router.get('/', middleware.authenticateToken, commentsController.getAllComments);
router.get('/careSession/:id', middleware.authenticateToken, commentsController.getCommentsByCareSessionId);
router.get('/:id', middleware.authenticateToken, commentsController.getCommentById);
router.post('/', middleware.authenticateToken, commentsController.createComment);
router.put('/:id', middleware.authenticateToken, commentsController.updateCommentById);
router.delete('/:id', middleware.authenticateToken, commentsController.deleteCommentById);

module.exports = router;
