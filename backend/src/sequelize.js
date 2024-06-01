const path = require("path");
const {Sequelize} = require("sequelize");
const config = require("../config/configNodeEnv.json")[process.env.NODE_ENV];
const dbUser = config.username;
const dbPassword = config.password;
const dbName = config.database;
const host = config.host;
const dialect = config.dialect;
const port = config.port;
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: host,
    dialect: dialect,
    port: port,
});
module.exports = sequelize;