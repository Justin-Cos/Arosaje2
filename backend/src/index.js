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


// Synchronize Sequelize models with the database and add seed data if necessary
sequelize.sync().then(async () => {
    console.log('Sequelize models synchronized with the database');
    // Connexion à la base de données SQLite
    let usersCount = await models.User.count();
    if (usersCount === 0) {
        await require('./seeders/20240129170544-seed').down(sequelize.getQueryInterface())
        await require('./seeders/20240129170544-seed').up(sequelize.getQueryInterface());
    }
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
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/plant", plantRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/care-session", careSessionRoutes);
app.use("/api/v1/comment", commentRoutes);
app.use("/api/v1/plant-type", plantTypeRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


// Démarrage du serveur
app.listen(3000, () => {
    console.log("Serveur démarré (http://localhost:3000/) !");
});