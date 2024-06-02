const express = require('express');
const messageController = require('../controllers/messageController');
const middleware = require("../middleware");
const Pusher = require("pusher");

const router = express.Router();

const pusher = new Pusher({
    appId: "1812654",
    key: "2c7dc8472096aaae640d",
    secret: "317515c9d16d13572394",
    cluster: "eu",
    useTLS: true
});

pusher.trigger("my-channel", "my-event", {
    message: "hello world"
});

router.post('/pusher/auth', middleware.authenticateToken, (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const presenceData = {
        user_id: req.user.id,
        user_info: {
            username: req.user.username,
            email: req.user.email
        }
    };
    const auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
});

router.get('/conversation', middleware.authenticateToken, messageController.getConversation);
router.post('/', middleware.authenticateToken, messageController.newMessage);
router.delete('/:id', middleware.authenticateToken, messageController.deleteMessage);

module.exports = router;