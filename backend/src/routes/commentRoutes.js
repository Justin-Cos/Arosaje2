const express = require('express');
const commentsController = require('../controllers/commentController');

const router = express.Router();

router.get('/', commentsController.getAllComments);
router.get('/:id', commentsController.getCommentById);
router.post('/', commentsController.createComment);
router.put('/:id', commentsController.updateCommentById);
router.delete('//:id', commentsController.deleteCommentById);

module.exports = router;
