const Comments = require('../models/Comment');
const CareSession = require('../models/CareSession');
const User = require('../models/User');


// Controller methods
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comments.findAll({
            include: [{model: User}, {model: CareSession}],
        });
        res.json(comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.getCommentById = async (req, res) => {
    const commentId = req.params.id;
    try {
        const comment = await Comments.findByPk(commentId, {
            include: [{model: User}, {model: CareSession}],
        });
        if (!comment) {
            return res.status(404).json({error: 'Comment not found'});
        }
        res.json(comment);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.createComment = async (req, res) => {
    const {care_session, author, author_role, date, content, image} = req.body;
    try {
        const newComment = await Comments.create({care_session, author, author_role, date, content, image});
        res.status(201).json(newComment);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.updateCommentById = async (req, res) => {
    const commentId = req.params.id;
    const {care_session, author, author_role, date, content, image} = req.body;
    try {
        const commentToUpdate = await Comments.findByPk(commentId);
        if (!commentToUpdate) {
            return res.status(404).json({error: 'Comment not found'});
        }
        commentToUpdate.care_session = care_session;
        commentToUpdate.author = author;
        commentToUpdate.author_role = author_role;
        commentToUpdate.date = date;
        commentToUpdate.content = content;
        commentToUpdate.image = image;
        await commentToUpdate.save();
        res.json({message: 'Comment updated successfully', comment: commentToUpdate});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.deleteCommentById = async (req, res) => {
    const commentId = req.params.id;
    try {
        const commentToDelete = await Comments.findByPk(commentId);
        if (!commentToDelete) {
            return res.status(404).json({error: 'Comment not found'});
        }
        await commentToDelete.destroy();
        res.json({message: 'Comment deleted successfully'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};