const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize.js');
const UserModel = require('./User');
const CareSession = require('./CareSession');

const Comments = sequelize.define('Comments', {
    id_comment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    care_session: {
        type: DataTypes.INTEGER,
        references: {
            model: CareSession,
            key: 'session_id',
        },
    },
    author: {
        type: DataTypes.INTEGER,
        references: {
            model: UserModel,
            key: 'user_id',
        },
        allowNull: false,

    },
    author_role: {
        type: DataTypes.ENUM('owner', 'caretaker', 'botanist', 'admin'),
        allowNull: false,
    },
    date: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: false,
});

Comments.belongsTo(UserModel, {foreignKey: 'author'});
Comments.belongsTo(CareSession, {foreignKey: 'care_session'});

module.exports = Comments;
