const express = require('express');
const commentsController = require('../controllers/commentController');
const middleware = require("../middleware");
const multer = require("multer");
const router = express.Router();
const storage = multer.diskStorage({
    destination: './uploads/comments',
});
const upload = multer({storage});

router.get('/', middleware.authenticateToken, commentsController.getAllComments);
router.get('/careSession/:id', middleware.authenticateToken, commentsController.getCommentsByCareSessionId);
router.get('/:id', middleware.authenticateToken, commentsController.getCommentById);
router.post('/', middleware.authenticateToken, upload.single('image'), commentsController.createComment);
router.put('/:id', middleware.authenticateToken, commentsController.updateCommentById);
router.delete('/:id', middleware.authenticateToken, commentsController.deleteCommentById);

module.exports = router;
