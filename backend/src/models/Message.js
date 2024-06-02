const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize.js');
const User = require('./User');
const Message = sequelize.define('Message', {
    message_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    recipient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    }
}, {
    timestamps: true,
});
module.exports = Message;