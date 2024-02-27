const UserModel = require('./User');
const PlantTypeModel = require('./PlantType');
const PlantsModel = require('./Plant');
const AddressModel = require('./Address');
const CommentModel = require('./Comment');
const CareSessionModel = require('./CareSession');
const sequelize = require('../sequelize.js');

UserModel.hasMany(PlantsModel, {
    foreignKey: 'owner',
    onDelete: 'CASCADE'
});
UserModel.hasMany(AddressModel, {
    foreignKey: 'owner',
    onDelete: 'CASCADE'
});
PlantsModel.belongsTo(UserModel, {foreignKey: 'owner'});
PlantsModel.belongsTo(PlantTypeModel, {foreignKey: 'plant_type'});
UserModel.hasMany(CareSessionModel, {
    foreignKey: 'caretaker',
    onDelete: 'SET NULL',
});
CareSessionModel.belongsTo(UserModel, {foreignKey: 'caretaker'});
UserModel.hasMany(CommentModel, {
    foreignKey: 'author',
    onDelete: 'CASCADE',
});
CommentModel.belongsTo(UserModel, {foreignKey: 'author'});
CareSessionModel.hasMany(CommentModel, {
    foreignKey: 'care_session',
    onDelete: 'CASCADE'
});
CommentModel.belongsTo(CareSessionModel, {foreignKey: 'care_session'});
PlantsModel.hasMany(CareSessionModel, {
    foreignKey: 'plant',
    onDelete: 'CASCADE',
});
CareSessionModel.belongsTo(PlantsModel, {foreignKey: 'plant'});
AddressModel.hasMany(CareSessionModel, {
    foreignKey: 'location',
    onDelete: 'CASCADE',
});
CareSessionModel.belongsTo(AddressModel, {foreignKey: 'location'});
module.exports = {
    User: UserModel,
    Plant: PlantsModel,
    Address: AddressModel,
    Comment: CommentModel,
    CareSession: CareSessionModel,
    sequelize
};
