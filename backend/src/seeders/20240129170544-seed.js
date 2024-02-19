const Address = require('../models/Address');
const User = require('../models/User');
const PlantType = require('../models/PlantType');
const Plant = require('../models/Plant');
const CareSession = require('../models/CareSession');
const Comment = require('../models/Comment');
const utils = require('../utils.js');
const {getRandomIndex, randomBoolean, hashPassword, generateRandomCoordinatesInFrance} = require("../utils");
const {LoremIpsum} = require("lorem-ipsum");
module.exports = {
    up: async (queryInterface, Sequelize) => {

        const usersData = [
            {
                username: 'Alice',
                email: 'alice@example.com',
                password: hashPassword('hashed_password'),
                profile_picture: 'demo_data/alice.jpg',
                bio: 'Passionate about plants and nature.',
            },
            {
                username: 'Bob',
                email: 'bob@example.com',
                password: hashPassword('hashed_password'),
                profile_picture: 'demo_data/bob.jpg',
                bio: 'Aspiring botanist with a green thumb.',
                role: 'botanist',
            },
            {
                username: 'Charlie',
                email: 'charlie@example.com',
                password: hashPassword('hashed_password'),
                profile_picture: 'demo_data/charlie.jpg',
                bio: 'Loves lazy Sundays and potted plants.',
            },
            {
                username: 'David',
                email: 'david@example.com',
                password: hashPassword('hashed_password'),
                profile_picture: 'demo_data/david.jpg',
                bio: 'Botanist by day, gamer by night.',
                role: 'botanist',
            },
            {
                username: 'Eva',
                email: 'eva@example.com',
                password: hashPassword('hashed_password'),
                profile_picture: 'demo_data/eva.jpg',
                bio: 'Dreaming of a garden filled with roses.',
                role: 'botanist',
            },
            {
                username: 'Frank',
                email: 'frank@example.com',
                password: hashPassword('hashed_password'),
                profile_picture: 'demo_data/frank.jpg',
                bio: 'Enjoys nature walks and herbal tea.',
                role: 'botanist',
            },
            {
                username: 'Grace',
                email: 'grace@example.com',
                password: hashPassword('hashed_password'),
                profile_picture: 'demo_data/grace.jpg',
                bio: 'Loves growing succulents on the windowsill.',
                role: 'botanist',
            },
            {
                username: 'Henry',
                email: 'henry@example.com',
                password: hashPassword('hashed_password'),
                profile_picture: 'demo_data/henry.jpg',
                bio: 'Believes in the healing power of plants.',
                role: 'botanist',
            },

            {
                username: 'Admin',
                email: 'Admin@Admin.com',
                password: hashPassword('Admin'),
                profile_picture: 'demo_data/Admin.jpg',
                bio: 'Admin',
                role: 'admin',
            },
        ];

        for (let i = 1; i <= 15; i++) {
            const newUser = {
                username: `User${i}`,
                email: `user${i}@example.com`,
                password: hashPassword('hashed_password'),
                profile_picture: `demo_data/user.jpg`,
                bio: `Bio for User${i}.`,
            };

            usersData.push(newUser);
        }


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
        const createdaddresses = [];

        for (const user of createdUsers) {
            createdaddresses.push(await Address.create({
                owner: user.user_id,
                ...generateRandomCoordinatesInFrance(),
                country: 'France',
                city: 'Saint-Grégoire',
                address: `Chez ${user.username}`,
                zip_code: 35760,
            }));
        }

        for (const user of createdUsers) {
            createdaddresses.push(await Address.create({
                owner: user.user_id,
                ...generateRandomCoordinatesInFrance(),
                country: 'France',
                city: 'Rennes',
                address: `Maison secondaire de ${user.username}`,
                zip_code: 35000,
            }));
        }

        let randomUser;
        let randomPlantType;
        let randomPlant;
        const lorem = new LoremIpsum({
            sentencesPerParagraph: {
                max: 4,
                min: 0
            },
            wordsPerSentence: {
                max: 10,
                min: 4
            }
        })

        for (let i = 0; i < 40; i++) {
            randomPlantType = createdPlantTypes[getRandomIndex(createdPlantTypes.length)];
            randomUser = createdUsers[getRandomIndex(createdUsers.length)];
            createdPlants.push(await Plant.create({
                owner: randomUser.user_id,
                plant_type: randomPlantType.plant_type_id,
                name: `${randomPlantType.name} de ${randomUser.username}`,
                image: `demo_data/${getRandomIndex(10)}.jpg`,
                indoor: utils.randomBoolean(),
            }));
            createdCareSessions.push(await CareSession.create({
                plant: createdPlants[i].plant_id,
                caretaker: randomBoolean() ? randomUser.user_id : null,
                location: createdaddresses.find(address => address.owner === randomUser.user_id).address_id,
                date_start: new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 10) + 11),
                date_end: new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 10) + 11),
                details:  randomBoolean() ? lorem.generateParagraphs(1) : null,
            }));
        }

        // session terminée
        createdCareSessions.push(await CareSession.create({
            plant: createdPlants[getRandomIndex(createdPlants.length)].plant_id,
            caretaker: randomUser.user_id,
            location: createdaddresses.find(address => address.owner === randomUser.user_id).address_id,
            date_start: new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 10) - 11),
            date_end: new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 10) - 11),
        }));

        //session en cours
        createdCareSessions.push(await CareSession.create({
            plant: createdPlants[getRandomIndex(createdPlants.length)].plant_id,
            caretaker: randomUser.user_id,
            location: createdaddresses.find(address => address.owner === randomUser.user_id).address_id,
            date_start: new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 10)),
            date_end: new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 10)),
        }));

        const commentsData = [
            {
                title: 'Arrosage',
                care_session: createdCareSessions[createdCareSessions.length -1].session_id,
                author: createdCareSessions[createdCareSessions.length -1].caretaker,
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
                care_session: createdCareSessions[createdCareSessions.length -1].session_id,
                author: createdCareSessions[createdCareSessions.length -1].caretaker,
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
                care_session: createdCareSessions[createdCareSessions.length -1].session_id,
                author: createdCareSessions[createdCareSessions.length -1].caretaker,
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
                care_session: createdCareSessions[createdCareSessions.length -1].session_id,
                author: createdCareSessions[createdCareSessions.length -1].caretaker,
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
