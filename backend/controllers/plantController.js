const Plant = require('../models/Plant');
const PlantType = require('../models/PlantType');
const User = require('../models/User');
const Address = require("../models/Address")


exports.getPlants = async (req, res) => {
    try {
        const plants = await Plant.findAll();
        res.render("plante/plantes", {model: plants});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur serveur");
    }
};


exports.postCreate = async (req, res) => {
    const {plantName, famille, location} = req.body;
    try {
        await Plant.create({plantName, famille, location});
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

        res.render('plante/create', {users, plantTypes});
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.getEdit = async (req, res) => {
    const id = req.params.id;
    try {
        const plant = await Plant.findByPk(id);
        res.render("plante/edit", {model: plant});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur serveur");
    }
};

exports.postEdit = async (req, res) => {
    const id = req.params.id;
    const {plantName, famille, location} = req.body;
    try {
        await Plant.update({plantName, famille, location}, {where: {plant_id: id}});
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
        res.render("plante/delete", {model: plant});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur serveur");
    }
};

exports.postDelete = async (req, res) => {
    const id = req.params.id;
    try {
        await Plant.destroy({where: {plant_id: id}});
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
        res.render("plante/detail", {model: plant});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur serveur");
    }
};


exports.getAllPlants = async (req, res) => {
    try {
        const plants = await Plant.findAll({
            include: [
                {model: User, attributes: ['username']},
                {model: PlantType, attributes: ['name']},
            ],
            attributes: {exclude: ['createdAt', 'updatedAt']},
            order: [['plant_id', 'ASC']],
        });
        res.status(200).json(plants);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

exports.getPlantById = async (req, res) => {
    const plantId = req.params.id;

    try {
        const plant = await Plant.findByPk(plantId);
        if (plant) {
            res.json(plant);
        } else {
            res.status(404).send('Plant not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.createPlant = async (req, res) => {
    const {plant_type, owner, name, image} = req.body;
    try {
        const newPlant = await Plant.create({plant_type, owner, name, image});
        res.json(newPlant);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur serveur");
    }
};

exports.updatePlant = async (req, res) => {
    const plantId = req.params.id;
    const {plant_type, owner, name, image} = req.body;

    try {
        const plantToUpdate = await Plant.findByPk(plantId);

        if (!plantToUpdate) {
            return res.status(404).json({error: 'Plant not found'});
        }

        plantToUpdate.plant_type = plant_type;
        plantToUpdate.owner = owner;
        plantToUpdate.name = name;
        plantToUpdate.image = image;

        await plantToUpdate.save();

        res.json({message: 'Plant updated successfully', plant: plantToUpdate});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};
exports.deletePlant = async (req, res) => {
    const plantId = req.params.id;

    try {
        const plantToDelete = await Plant.findByPk(plantId);

        if (!plantToDelete) {
            return res.status(404).json({error: 'Plant not found'});
        }

        await plantToDelete.destroy();

        res.json({message: 'Plant deleted successfully'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};
