const Plant = require('../models/Plant');
const PlantType = require('../models/PlantType');
const User = require('../models/User');
const {convertToSnakeCase} = require("../utils");
const fs = require("fs");
exports.getAllPlants = async (req, res) => {
    try {
        const plants = await Plant.findAll({
            include: [
                {model: User},
                {model: PlantType},
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
exports.getAllPlantsFromUser = async (req, res) => {
    const userId = req.params.user_id;
    try {
        const plants = await Plant.findAll({
            where: {
                owner: userId,
            },
        });
        res.status(200).json(plants);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

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
    const {plant_type, owner_id, name, indoor} = req.body;
    let image_name;
    let owner;
    try {
        owner = await User.findByPk(owner_id);
        image_name = convertToSnakeCase(`${name}_${owner.user_id}_${Date.now()}`) + '.jpg';
        await Plant.create({
            plant_type: plant_type,
            owner: owner_id,
            name: name,
            image: image_name,
            indoor: indoor,
        });
        await fs.renameSync(req.file.path, `./uploads/plants/${image_name}`);
        res.status(201).json({message: 'Plant created successfully'});
    } catch (error) {
        console.error(error.message);
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error(err);
            }
        });
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
