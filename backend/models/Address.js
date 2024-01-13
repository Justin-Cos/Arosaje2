
const { DataTypes } = require('sequelize');
const sequelize  = require('../sequelize.js');
const UserModel = require('../models/User.js');
console.log(sequelize.getDialect())
const Address = sequelize.define('Address', {
    adress_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'user_id',
        },
    },
    longitude: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    country: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    city: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    zip_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});
Address.belongsTo(UserModel, { foreignKey: 'owner' });

module.exports = Address;