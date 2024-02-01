const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize.js');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    profile_picture: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'botanist'),
        allowNull: true,
    },
}, {
    timestamps: false,
});

module.exports = User;
