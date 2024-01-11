const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plantController");

router.get("/plante", plantController.getPlants);
router.get("/plante/create", plantController.getCreate);
router.post("/plante/create", plantController.postCreate);
router.get("/plante/edit/:id", plantController.getEdit);
router.post("/plante/edit/:id", plantController.postEdit);
router.get("/plante/delete/:id", plantController.getDelete);
router.post("/plante/delete/:id", plantController.postDelete);
router.get("/plante/details/:id", plantController.getDetails);

module.exports = router;
