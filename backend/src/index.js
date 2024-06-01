const express = require("express");
const path = require("path");
const models = require('./models/index.js');
const sequelize = models.sequelize;
const userRoutes = require("./routes/userRoutes");
const plantRoutes = require("./routes/plantRoutes");
const addressRoutes = require("./routes/addressRoutes");
const careSessionRoutes = require("./routes/careSessionRoutes");
const commentRoutes = require("./routes/commentRoutes");
const plantTypeRoutes = require("./routes/plantTypeRoutes");
const seedDown = require('./seeders/20240129170544-seed').down;
const seedUp = require('./seeders/20240129170544-seed').up;
const config = require('../config/conf.json')[process.env.ENVIRONMENT];
// Synchronize Sequelize models with the database and add seed data if necessary
const dbPromise = sequelize.sync({ force: config.resetDatabase}).then(async () => {
    if (process.env.ENVIRONMENT !== "development" || process.env.ENVIRONMENT !== "test") {
        await seedDown(sequelize.getQueryInterface())
        await seedUp(sequelize.getQueryInterface());
    }

    console.log('Sequelize models synchronized with the database');
}).catch((error) => {
    console.error('Error synchronizing Sequelize models:', error);
});

// Création du serveur Express
const app = express();

// Configuration du serveur
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(express.urlencoded({extended: true}));


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/plant", plantRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/care-session", careSessionRoutes);
app.use("/api/v1/comment", commentRoutes);
app.use("/api/v1/plant-type", plantTypeRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


// Démarrage du serveur
const server = app.listen(3000, () => {
    console.log("Serveur démarré (http://localhost:3000/) !");
});

module.exports = server;