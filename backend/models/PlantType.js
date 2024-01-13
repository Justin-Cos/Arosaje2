const { DataTypes } = require('sequelize');
const sequelize  = require('../sequelize.js');

const PlantsType = sequelize.define('PlantsType', {
    plant_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = PlantsType;
