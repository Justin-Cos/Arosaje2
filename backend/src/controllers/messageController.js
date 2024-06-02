const MessageModel = require('../models/Message');
const UserModel = require('../models/User');
const {Op} = require("sequelize");

const MessageController = {
    newMessage: async (req, res) => {
        const { content, recipient_id } = req.body;
        const sender_id = req.user.user_id;

        try {
            const message = await MessageModel.create({
                content,
                sender_id,
                recipient_id
            });

            res.status(201).json(message);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getConversation: async (req, res) => {
        const { user1_id, user2_id } = req.params;

        try {
            const messages = await MessageModel.findAll({
                where: {
                    [Op.or]: [
                        { sender_id: user1_id, recipient_id: user2_id },
                        { sender_id: user2_id, recipient_id: user1_id }
                    ]
                },
                order: [['createdAt', 'ASC']]
            });

            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteMessage: async (req, res) => {
        const { id } = req.params;

        try {
            const message = await MessageModel.findOne({ where: { message_id: id } });

            if (message) {
                await message.destroy();
                res.status(200).json({ message: 'Message deleted' });
            } else {
                res.status(404).json({ message: 'Message not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

};

module.exports = MessageController;