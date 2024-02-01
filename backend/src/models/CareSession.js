const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize.js');
const UserModel = require('./User');
const PlantsModel = require('./Plant');
const AddressModel = require('./Address');


const CareSession = sequelize.define('CareSessions', {
    session_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    plant: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PlantsModel,
            key: 'plant_id',
        },
    },
    caretaker: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: UserModel,
            key: 'user_id',
        },
    },
    location: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AddressModel,
            key: 'adress_id',
        },
    },
    date_start: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    date_end: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: false,
});

CareSession.belongsTo(UserModel, {foreignKey: 'caretaker'});
CareSession.belongsTo(PlantsModel, {foreignKey: 'plant'});
CareSession.belongsTo(AddressModel, {foreignKey: 'location'});

module.exports = CareSession;
