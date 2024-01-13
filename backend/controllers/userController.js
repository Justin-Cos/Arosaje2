const User = require('../models/User');
const Plant = require("../models/Plant");

exports.getUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.render("user/users", { model: users });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur serveur");
  }
};

exports.getCreate = (req, res) => {
  res.render("user/create", { model: {} });
};

exports.postCreate = async (req, res) => {
  const { FirstName, LastName } = req.body;
  try {
    await User.create({ FirstName, LastName });
    res.redirect("/users");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur serveur");
  }
};

exports.getEdit = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    res.render("user/edit", { model: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur serveur");
  }
};

exports.postEdit = async (req, res) => {
  const id = req.params.id;
  const { FirstName, LastName } = req.body;
  try {
    await User.update({ FirstName, LastName }, { where: { user_id: id } });
    res.redirect("/users");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur serveur");
  }
};

exports.getDelete = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    res.render("user/delete", { model: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur serveur");
  }
};

exports.postDelete = async (req, res) => {
  const id = req.params.id;
  try {
    await User.destroy({ where: { user_id: id } });
    res.redirect("/users");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur serveur");
  }
};

exports.getDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    res.render("user/detail", { model: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur serveur");
  }
};
exports.getAllUserPlant = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{
        model: Plant,
        as: 'plants',
        attributes: ['name'],
      }],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['user_id', 'username'],
      include: [{
        model: Plant,
        attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.literal('DISTINCT p.name')), 'ownedPlants']],
        as: 'plants',
        through: { attributes: [] }, // Exclude junction table fields
      }],
      group: ['User.user_id'],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};

