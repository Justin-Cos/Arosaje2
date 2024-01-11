// routes/loginRoutes.js
const express = require("express");
const loginController = require("../controllers/loginController");
const router = express.Router();

// Route pour afficher la page de connexion
router.get("/login", loginController.loginPage);
router.get("/register", loginController.registerPage);


// Autres routes d'authentification (par exemple, traitement du formulaire de connexion)
// router.post("/login", loginController.handleLogin);

module.exports = router;