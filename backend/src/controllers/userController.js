const User = require('../models/User');
const Plant = require("../models/Plant");
const {convertToSnakeCase, hashPassword} = require("../utils");
const fs = require("fs");
// Controller methods
exports.getAllUserPlant = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{
                model: Plant,
            }],
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.getAllBotanists = async (req, res) => {
    try {
        const botanists = await User.findAll({
            where: {
                role: 'botanist',
            },
        });
        res.json(botanists);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};
exports.registerUser = async (req, res) => {
    const {username, email,bio, password, role} = req.body;
    let image_name;
    try {
        image_name = convertToSnakeCase(`${username}_${Date.now()}`) + '.jpg';
        await User.create({
            username: username,
            email: email,
            bio: bio,
            password: hashPassword(password),
            role: role,
            profile_picture: image_name,
        });
        await fs.renameSync(req.file.path, `./uploads/profile_pictures/${image_name}`);
        res.status(201).json({message: 'User created successfully'});
    } catch (error) {

        res.status(500).send("Erreur serveur");
    }
}


exports.updateUserById = async (req, res) => {
    const userId = req.params.id;
    const {username, email, password, role} = req.body;
    try {
        const userToUpdate = await User.findByPk(userId);
        if (!userToUpdate) {
            return res.status(404).json({error: 'User not found'});
        }
        userToUpdate.username = username;
        userToUpdate.email = email;
        userToUpdate.password = password;
        userToUpdate.role = role;
        await userToUpdate.save();
        res.json({message: 'User updated successfully', user: userToUpdate});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.deleteUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const userToDelete = await User.findByPk(userId);
        if (!userToDelete) {
            return res.status(404).json({error: 'User not found'});
        }
        await userToDelete.destroy();
        res.json({message: 'User deleted successfully'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

