const plantModel = require("../models/plantModel");

exports.getPlants = (req, res) => {
  plantModel.getAllPlants((err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur serveur");
    }
    res.render("plante/plantes", { model: rows });
  });
};

exports.getCreate = (req, res) => {
  res.render("plante/create", { model: {} });
};

exports.postCreate = (req, res) => {
  const { plantName, famille, location } = req.body;
  const plante = [plantName, famille, location];
  plantModel.createPlant(plante, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur serveur");
    }
    res.redirect("/");
  });
};

exports.getEdit = (req, res) => {
  const id = req.params.id;
  plantModel.getPlantById(id, (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur serveur");
    }
    res.render("plante/edit", { model: row });
  });
};

exports.postEdit = (req, res) => {
  const id = req.params.id;
  const { plantName, famille, location } = req.body;
  const plante = [plantName, famille, location, id];
  plantModel.updatePlant(plante, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur serveur");
    }
    res.redirect("/");
  });
};

exports.getDelete = (req, res) => {
  const id = req.params.id;
  plantModel.getPlantById(id, (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur serveur");
    }
    res.render("plante/delete", { model: row });
  });
};

exports.postDelete = (req, res) => {
  const id = req.params.id;
  plantModel.deletePlant(id, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur serveur");
    }
    res.redirect("/");
  });
};

exports.getDetails = (req, res) => {
  const id = req.params.id;
  plantModel.getPlantByIdALL(id, (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur serveur");
    }
    res.render("plante/detail", { model: row });
  });
};
