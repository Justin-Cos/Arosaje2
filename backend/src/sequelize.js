const path = require("path");
const conf = require("../config/config.json");
const {Sequelize} = require("sequelize");
const db_name = path.join(__dirname, process.env.NODE_ENV === 'container' ? conf.container.storage : conf.development.storage);
const sequelize = new Sequelize("aroshash", 'postgres', 'postgres', {
    host: 'host.docker.internal',
    dialect: 'postgres',
    port: 5432,
});
module.exports = sequelize;