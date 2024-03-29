const User = require('../models/User');
const Plant = require("../models/Plant");
const Address = require('../models/Address');

const {convertToSnakeCase, hashPassword} = require("../utils");
const fs = require("fs");
const {sign} = require("jsonwebtoken");
const {Op} = require("sequelize");
// Controller methods
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
exports.getUsersNameLike = async (req, res) => {
    const name = req.query.name;
    try {
        const users = await User.findAll({
            where: {
                username: {
                    [Op.like]: `%${name}%`,
                },
            },
            limit: 10,
        });
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
}

exports.registerUser = async (req, res) => {
    const {username, email, bio, password, role} = req.body;
    console.log('image', req.file.path)
    try {
        const image_name = convertToSnakeCase(`${username}_${Date.now()}`) + '.jpg';
        const createdUser = await User.create({
            username: username,
            email: email,
            bio: bio,
            password: hashPassword(password),
            role: role,
            profile_picture: image_name,
        });
        await fs.renameSync(req.file.path, `./uploads/profile_pictures/${image_name}`);
        sign({
            user_id: createdUser.user_id,
            username: username,
            role: role,
            profile_picture: image_name,
            addresses: [],
        }, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) {
                console.error(err);
                res.status(500).json({message: 'Internal Server Error'});
            } else {
                res.status(201).json({token: token, user_id: createdUser.user_id});
            }
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({message: "Nom d'utilisateur ou email déjà existant"});
        } else if (error.name === 'ValidationError') {
            res.status(400).json({message: "Nom d'utilisateur ou email incorrect", errors: error.errors});
        } else {
            console.error(error);
            res.status(500).json({message: 'Erreur inconnue'});
        }
    }
}

exports.loginUser = async (req, res) => {
    const {username, password} = req.body;
    console.log(req.body)
    try {
        const user = await User.findOne({
            where: {
                username: username,
            },
        });
        if (!user) {
            return res.status(401).json({error: 'Utilisateur non trouvé'});
        } else if (user.password !== hashPassword(password)) {
            return res.status(401).json({error: 'Mot de passe incorrect'});
        } else {
            const address = await Address.findAll({
                where: {
                    owner: user.user_id
                },
            });
            sign({
                user_id: user.user_id,
                username: user.username,
                role: user.role,
                profile_picture: user.profile_picture,
                addresses: address,
            }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({message: 'Erreur inconnue'});
                } else {
                    res.json({token: token});
                }
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}
exports.updateToken = async (req, res) => {
    const userId = req.query.user;
    try {
        const user = await User.findOne({
            where: {
                user_id: userId,
            },
        });
        const addresses = await Address.findAll({
            where: {
                owner: user.user_id
            },
        });
        sign({
            user_id: user.user_id,
            username: user.username,
            role: user.role,
            profile_picture: user.profile_picture,
            addresses: addresses,
        }, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) {
                console.error(err);
                res.status(500).json({message: 'Erreur inconnue'});
            } else {
                res.json({token: token});
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
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
        userToUpdate.username = username ?? userToUpdate.username;
        userToUpdate.email = email ?? userToUpdate.email;
        //userToUpdate.password = hashPassword(password) ?? userToUpdate.password;
        userToUpdate.role = role ?? userToUpdate.role;
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

