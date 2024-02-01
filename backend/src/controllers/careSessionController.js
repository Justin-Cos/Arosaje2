// Import necessary modules
const CareSessions = require('../models/CareSession'); // Adjust the path based on your project structure
const Plant = require('../models/Plant');
const User = require('../models/User');
const Address = require('../models/Address');
const {Op} = require("sequelize");


// Controller methods
exports.getAllCareSessions = async (req, res) => {
    try {
        const careSessions = await CareSessions.findAll({
            include: [{model: User}, {model: Plant}, {model: Address}],
        });
        res.json(careSessions);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.getNextCareSessions = async (req, res) => {
    try {
        const careSessions = await CareSessions.findAll({
            include: [{model: User}, {model: Plant}, {model: Address}],
            where: {
                date_end: {
                    [Op.gt]: new Date(),
                },
                date_start: {
                    [Op.gt]: new Date(),
                }
            }
        });
        res.json(careSessions);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};
exports.getPreviousCareSessions = async (req, res) => {
    try {
        const careSessions = await CareSessions.findAll({
            include: [{model: User}, {model: Plant}, {model: Address}],
            where: {
                date_end: {
                    [Op.lt]: new Date(),
                },
                date_start: {
                    [Op.lt]: new Date(),
                }
            }
        });
        res.json(careSessions);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
}
exports.getActiveCareSessions = async (req, res) => {
    try {
        const careSessions = await CareSessions.findAll({
            include: [{model: User}, {model: Plant}, {model: Address}],
            where : {
                date_end: {
                    [Op.gt]: new Date(),
                },
                date_start: {
                    [Op.lt]: new Date(),
                }
            }
        });
        res.json(careSessions);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};
exports.getCareSessionById = async (req, res) => {
    const sessionId = req.params.id;
    try {
        const careSession = await CareSessions.findByPk(sessionId, {
            include: [{model: User}, {model: Plant}, {model: Address}],
        });
        if (!careSession) {
            return res.status(404).json({error: 'Care session not found'});
        }
        res.json(careSession);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.createCareSession = async (req, res) => {
    const {plant, caretaker, location, date_start, date_end} = req.body;
    try {
        const newCareSession = await CareSessions.create({plant, caretaker, location, date_start, date_end});
        res.status(201).json(newCareSession);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.updateCareSessionById = async (req, res) => {
    const sessionId = req.params.id;
    const {plant, caretaker, location, date_start, date_end} = req.body;
    try {
        const careSessionToUpdate = await CareSessions.findByPk(sessionId);
        if (!careSessionToUpdate) {
            return res.status(404).json({error: 'Care session not found'});
        }
        careSessionToUpdate.plant = plant;
        careSessionToUpdate.caretaker = caretaker;
        careSessionToUpdate.location = location;
        careSessionToUpdate.date_start = date_start;
        careSessionToUpdate.date_end = date_end;
        await careSessionToUpdate.save();
        res.json({message: 'Care session updated successfully', careSession: careSessionToUpdate});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.deleteCareSessionById = async (req, res) => {
    const sessionId = req.params.id;
    try {
        const careSessionToDelete = await CareSessions.findByPk(sessionId);
        if (!careSessionToDelete) {
            return res.status(404).json({error: 'Care session not found'});
        }
        await careSessionToDelete.destroy();
        res.json({message: 'Care session deleted successfully'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};
