const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plantController");

//API
router.get('/', plantController.getAllPlants);
router.get('/:id', plantController.getPlantById);
router.post('/', plantController.createPlant);
router.put('/:id', plantController.updatePlant);
router.delete('/:id', plantController.deletePlant);

//Vues
router.get("/form", plantController.getPlants);
router.get("/form/create", plantController.getCreate);
router.post("/form/create", plantController.postCreate);
router.get("/form/edit/:id", plantController.getEdit);
router.post("/form/edit/:id", plantController.postEdit);
router.get("/form/delete/:id", plantController.getDelete);
router.post("/form/delete/:id", plantController.postDelete);
router.get("/form/details/:id", plantController.getDetails);

module.exports = router;
