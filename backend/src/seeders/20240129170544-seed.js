const Address = require('../models/Address');
const User = require('../models/User');
const PlantType = require('../models/PlantType');
const Plant = require('../models/Plant');
const CareSession = require('../models/CareSession');
const Comment = require('../models/Comment');
const utils = require('../utils.js');
const {getRandomIndex, randomBoolean} = require("../utils");
module.exports = {
    up: async (queryInterface, Sequelize) => {

        const usersData = [
            {
                username: 'Alice',
                email: 'alice@example.com',
                password: 'hashed_password_1',
                profile_picture: 'demo_data/alice.jpg',
                bio: 'Passionate about plants and nature.',
            },
            {
                username: 'Bob',
                email: 'bob@example.com',
                password: 'hashed_password_2',
                profile_picture: 'demo_data/bob.jpg',
                bio: 'Aspiring botanist with a green thumb.',
                role: 'botanist',
            },
            {
                username: 'Charlie',
                email: 'charlie@example.com',
                password: 'hashed_password_3',
                profile_picture: 'demo_data/charlie.jpg',
                bio: 'Loves lazy Sundays and potted plants.',
            },
            {
                username: 'David',
                email: 'david@example.com',
                password: 'hashed_password_4',
                profile_picture: 'demo_data/david.jpg',
                bio: 'Botanist by day, gamer by night.',
                role: 'botanist',
            },
            {
                username: 'Eva',
                email: 'eva@example.com',
                password: 'hashed_password_5',
                profile_picture: 'demo_data/eva.jpg',
                bio: 'Dreaming of a garden filled with roses.',
                role: 'botanist',
            },
            {
                username: 'Frank',
                email: 'frank@example.com',
                password: 'hashed_password_6',
                profile_picture: 'demo_data/frank.jpg',
                bio: 'Enjoys nature walks and herbal tea.',
                role: 'botanist',
            },
            {
                username: 'Grace',
                email: 'grace@example.com',
                password: 'hashed_password_7',
                profile_picture: 'demo_data/grace.jpg',
                bio: 'Loves growing succulents on the windowsill.',
                role: 'botanist',
            },
            {
                username: 'Henry',
                email: 'henry@example.com',
                password: 'hashed_password_8',
                profile_picture: 'demo_data/henry.jpg',
                bio: 'Believes in the healing power of plants.',
                role: 'botanist',
            },
            {
                username: 'Admin',
                email: 'Admin@Admin.com',
                password: 'Admin',
                profile_picture: 'demo_data/Admin.jpg',
                bio: 'Admin',
                role: 'admin',
            },
        ];
        const plantTypesData = [
            {name: 'Aloe Vera'},
            {name: 'Cactus'},
            {name: 'Orchidée'},
            {name: 'Palmier'},
            {name: 'Bananier'},
            {name: 'Bambou'},
            {name: 'Bégonia'},
            {name: 'Broméliacée'},
            {name: 'Cactus'},
            {name: 'Cactus de Noël'},
            {name: 'Hortensia'},
            {name: 'Spathiphyllum'},
            {name: 'Bougainvillier'},
        ];


        const createdUsers = await User.bulkCreate(usersData, {returning: true});
        const createdPlantTypes = await PlantType.bulkCreate(plantTypesData, {returning: true});
        const createdPlants = [];
        const createdCareSessions = [];
        const createdAdresses = [];

        for (const user of createdUsers) {
            createdAdresses.push(await Address.create({
                owner: user.user_id,
                longitude: Math.random() * (180 - (-180)) + (-180),
                latitude: Math.random() * (90 - (-90)) + (-90),
                country: 'France',
                city: 'Saint-Grégoire',
                address: `Chez ${user.username}`,
                zip_code: 35760,
            }));
        }

        let randomUser;
        let randomPlantType;
        let randomPlant;

        for (let i = 0; i < 10; i++) {
            randomPlantType = createdPlantTypes[getRandomIndex(createdPlantTypes.length)];
            randomUser = createdUsers[getRandomIndex(createdUsers.length)];
            createdPlants.push(await Plant.create({
                owner: randomUser.user_id,
                plant_type: randomPlantType.plant_type_id,
                name: `${randomPlantType.name} de ${randomUser.username}`,
                image: `demo_data/${i}.jpg`,
                indoor: utils.randomBoolean(),
            }));
            createdCareSessions.push(await CareSession.create({
                plant: createdPlants[i].plant_id,
                caretaker: randomBoolean() ? randomUser.user_id : null, // 50% de chance d'avoir un caretaker
                location: createdAdresses.find(address => address.owner === randomUser.user_id).adress_id,
                date_start: new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 10) + 11),
                date_end: new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 10) + 11),
            }));
        }

        // session terminée
        createdCareSessions.push(await CareSession.create({
            plant: createdPlants[getRandomIndex(createdPlants.length)].plant_id,
            caretaker: randomUser.user_id,
            location: createdAdresses.find(address => address.owner === randomUser.user_id).adress_id,
            date_start: new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 10) - 11),
            date_end: new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 10) - 11),
        }));

        //session en cours
        createdCareSessions.push(await CareSession.create({
            plant: createdPlants[getRandomIndex(createdPlants.length)].plant_id,
            caretaker: randomUser.user_id,
            location: createdAdresses.find(address => address.owner === randomUser.user_id).adress_id,
            date_start: new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 10)),
            date_end: new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 10)),
        }));

        const commentsData = [
            {
                care_session: createdCareSessions[0].session_id,
                author: createdCareSessions[0].caretaker,
                author_role: 'caretaker',
                date: new Date(),
                content: 'J\'ai bien arrosé la plante aujourd\'hui.',
            },
            {
                care_session: createdCareSessions[getRandomIndex(createdCareSessions.length)].session_id,
                author: createdUsers[getRandomIndex(createdUsers.length)].user_id,
                author_role: 'botanist',
                date: new Date(),
                content: 'Arrêtez de l\'arroser, elle a déjà assez d\'eau !',
            },
            {
                care_session: createdCareSessions[3].session_id,
                author: createdCareSessions[3].caretaker,
                author_role: 'caretaker',
                date: new Date(),
                content: 'Je l\'ai mise au soleil aujourd\'hui.',
            },
            {
                care_session: createdCareSessions[getRandomIndex(createdCareSessions.length)].session_id,
                author: createdUsers[getRandomIndex(createdUsers.length)].user_id,
                author_role: 'botanist',
                date: new Date(),
                content: 'Elle a besoin de plus de lumière.',
            },
            {
                care_session: createdCareSessions[3].session_id,
                author: (await Plant.findByPk(createdCareSessions[3].plant)).get('owner'),
                author_role: 'owner',
                date: new Date(),
                content: 'Merci pour votre travail !',
            },
            {
                care_session: createdCareSessions[getRandomIndex(createdCareSessions.length)].session_id,
                author: createdUsers[8].user_id,
                author_role: 'admin',
                date: new Date(),
                content: 'Je vous ai envoyé un message privé.',

            },
            {
                care_session: createdCareSessions[2].session_id,
                author: createdCareSessions[2].caretaker,
                author_role: 'caretaker',
                date: new Date(),
                content: 'pas de soucis, je m\'en occupe !',
            },
            {
                care_session: createdCareSessions[getRandomIndex(createdCareSessions.length)].session_id,
                author: createdUsers[getRandomIndex(createdUsers.length)].user_id,
                author_role: 'botanist',
                date: new Date(),
                content: 'tu fais n\'importe quoi, elle a déjà assez d\'eau !',
            },
            {
                care_session: createdCareSessions[1].session_id,
                author: createdCareSessions[1].caretaker,
                author_role: 'caretaker',
                date: new Date(),
                content: 'un peu d\'engrais aujourd\'hui.',
                image: 'demo_data/engrais.jpg',
            },
            {
                care_session: createdCareSessions[getRandomIndex(createdCareSessions.length)].session_id,
                author: createdUsers[getRandomIndex(createdUsers.length)].user_id,
                author_role: 'botanist',
                date: new Date(),
                content: 'c\'est trop tôt pour l\'engrais, attendez encore un peu.',
            },
            {
                care_session: createdCareSessions[0].session_id,
                author: (await Plant.findByPk(createdCareSessions[0].plant)).get('owner'),
                author_role: 'owner',
                date: new Date(),
                image: 'demo_data/merci.jpg',
            },
        ];
        await Comment.bulkCreate(commentsData, {returning: true});
    },

    down: async (queryInterface, Sequelize) => {
        await Address.destroy({where: {}});
        await User.destroy({where: {}});
        await PlantType.destroy({where: {}});
        await Plant.destroy({where: {}});
        await CareSession.destroy({where: {}});
        await Comment.destroy({where: {}});
    },
};
