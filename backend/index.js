
const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const conf = require("./config.json");

const sequelize = require('./sequelize.js');  // Use require instead of import

const AddressModel = require('./models/Address');  // Use require instead of import
const UserModel = require('./models/User');
const PlantsTypeModel = require('./models/PlantType');
const PlantsModel = require('./models/Plant');
const CareSessionsModel = require('./models/CareSession');
const CommentsModel = require('./models/Comment');
// Synchronize Sequelize models with the database
sequelize.sync().then(() => {
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
app.use(express.urlencoded({ extended: false }));

// Connexion à la base de données SQLite
const db_name = path.join(__dirname, "database", conf.database_url);
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Connexion réussie à la base de données ${conf.database_url}`);
});

// Utilisation des routes
const userRoutes = require("./routes/userRoutes");
const plantRoutes = require("./routes/plantRoutes");
const loginRoutes = require("./routes/loginRoutes"); // Ajout de l'import pour les routes de connexion
const loginController = require('./controllers/loginController');

app.use("/", userRoutes);
app.use("/", plantRoutes);
app.use("/", loginRoutes);

app.get('/login', loginController.loginPage); // Déplacement de cette ligne après l'import du contrôleur
app.get('/register', loginController.registerPage);

/*
app.get("/", (req, res) => {
  // Logique pour récupérer les données des utilisateurs depuis la base de données
  const User = require("./controllers/userController");
  User.getAllUserPlant((err, userRows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur serveur");
    }
    // Logique pour récupérer les données des plantes depuis la base de données
    const plantModel = require("./models/plantModel");
    plantModel.getAllPlants((err, plantRows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Erreur serveur");
      }
      // Rendre la vue avec les données récupérées
      res.render("index", { users: userRows, plants: plantRows });
    });
  });
});
*/
// Démarrage du serveur
app.listen(3000, () => {
  console.log("Serveur démarré (http://localhost:3000/) !");
});
