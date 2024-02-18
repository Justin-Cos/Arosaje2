const PlantsType = require('../models/PlantType');
const Plant = require("../models/Plant");

exports.getAllPlantTypes = async (req, res) => {
    try {
        const plantTypes = await PlantsType.findAll();
        res.json(plantTypes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.getPlantTypeById = async (req, res) => {
    const plantTypeId = req.params.id;
    try {
        const plantType = await PlantsType.findByPk(plantTypeId,{include: [{model: Plant}]});
        if (!plantType) {
            return res.status(404).json({error: 'Plant type not found'});
        }
        res.json(plantType);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.createPlantType = async (req, res) => {
    const {name} = req.body;
    try {
        const newPlantType = await PlantsType.create({name});
        res.status(201).json(newPlantType);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.updatePlantTypeById = async (req, res) => {
    const plantTypeId = req.params.id;
    const {name} = req.body;
    try {
        const plantTypeToUpdate = await PlantsType.findByPk(plantTypeId);
        if (!plantTypeToUpdate) {
            return res.status(404).json({error: 'Plant type not found'});
        }
        plantTypeToUpdate.name = name;
        await plantTypeToUpdate.save();
        res.json({message: 'Plant type updated successfully', plantType: plantTypeToUpdate});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.deletePlantTypeById = async (req, res) => {
    const plantTypeId = req.params.id;
    try {
        const plantTypeToDelete = await PlantsType.findByPk(plantTypeId);
        if (!plantTypeToDelete) {
            return res.status(404).json({error: 'Plant type not found'});
        }
        await plantTypeToDelete.destroy();
        res.json({message: 'Plant type deleted successfully'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};
