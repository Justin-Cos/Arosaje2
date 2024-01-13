const Plant = require('../models/Plant');
const PlantType = require('../models/PlantType');
const User = require('../models/User');
const Address = require("../models/Address")


exports.getPlants = async (req, res) => {
  try {
    const plants = await Plant.findAll();
    res.render("plante/plantes", { model: plants });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur serveur");
  }
};


exports.postCreate = async (req, res) => {
  const { plantName, famille, location } = req.body;
  try {
    await Plant.create({ plantName, famille, location });
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur serveur");
  }
};

exports.getCreate = async (req, res) => {
  try {
    const users = await User.findAll();
    const plantTypes = await PlantType.findAll();

    res.render('plante/create', { users, plantTypes });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
};
exports.getEdit = async (req, res) => {
  const id = req.params.id;
  try {
    const plant = await Plant.findByPk(id);
    res.render("plante/edit", { model: plant });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur serveur");
  }
};

exports.postEdit = async (req, res) => {
  const id = req.params.id;
  const { plantName, famille, location } = req.body;
  try {
    await Plant.update({ plantName, famille, location }, { where: { plant_id: id } });
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur serveur");
  }
};

exports.getDelete = async (req, res) => {
  const id = req.params.id;
  try {
    const plant = await Plant.findByPk(id);
    res.render("plante/delete", { model: plant });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur serveur");
  }
};

exports.postDelete = async (req, res) => {
  const id = req.params.id;
  try {
    await Plant.destroy({ where: { plant_id: id } });
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur serveur");
  }
};



exports.getDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const plant = await Plant.findByPk(id);
    res.render("plante/detail", { model: plant });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur serveur");
  }

};
exports.getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.findAll({
      attributes: ['plant_id', 'plantName', 'famille', 'location', 'image'],
      include: [
        {
          model: User,
          attributes: ['user_id', 'username'],
          include: [
            {
              model: Address,
              attributes: ['country'],
            },
          ],
        },
      ],
      order: [['plant_id', 'ASC']],
    });

    res.render('plante/plants', { model: plants });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erreur serveur');
  }
};