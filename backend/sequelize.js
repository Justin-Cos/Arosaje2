const path = require("path");
const conf = require("./config.json");
const { Sequelize, DataTypes} = require("sequelize");
const db_name = path.join(__dirname, "database", conf.database_url);

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: db_name,
});
module.exports = sequelize;