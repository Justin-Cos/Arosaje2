const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize.js');
const UserModel = require('./User');
const PlantsTypeModel = require('./PlantType.js');

const Plant = sequelize.define('Plants', {
    plant_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    plant_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PlantsTypeModel,
            key: 'plant_type_id',
        },
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'user_id',
        },
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT,
    },
    indoor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    timestamps: false,
});


module.exports = Plant;
