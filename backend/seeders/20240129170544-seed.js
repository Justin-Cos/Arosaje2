const Address = require('../models/Address');
const User = require('../models/User');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersData = [
      {
        username: 'Alice',
        email: 'alice@example.com',
        password: 'hashed_password_1',
        profile_picture: 'alice.jpg',
        bio: 'Passionate about plants and nature.',
      },
      {
        username: 'Bob',
        email: 'bob@example.com',
        password: 'hashed_password_2',
        profile_picture: 'bob.jpg',
        bio: 'Aspiring botanist with a green thumb.',
        role: 'botanist',
      },
      {
        username: 'Charlie',
        email: 'charlie@example.com',
        password: 'hashed_password_3',
        profile_picture: 'charlie.jpg',
        bio: 'Loves lazy Sundays and potted plants.',
      },
      {
        username: 'David',
        email: 'david@example.com',
        password: 'hashed_password_4',
        profile_picture: 'david.jpg',
        bio: 'Botanist by day, gamer by night.',
        role: 'botanist',
      },
      {
        username: 'Eva',
        email: 'eva@example.com',
        password: 'hashed_password_5',
        profile_picture: 'eva.jpg',
        bio: 'Dreaming of a garden filled with roses.',
        role: 'botanist',
      },
      {
        username: 'Frank',
        email: 'frank@example.com',
        password: 'hashed_password_6',
        profile_picture: 'frank.jpg',
        bio: 'Enjoys nature walks and herbal tea.',
        role: 'botanist',
      },
      {
        username: 'Grace',
        email: 'grace@example.com',
        password: 'hashed_password_7',
        profile_picture: 'grace.jpg',
        bio: 'Loves growing succulents on the windowsill.',
        role: 'botanist',
      },
      {
        username: 'Henry',
        email: 'henry@example.com',
        password: 'hashed_password_8',
        profile_picture: 'henry.jpg',
        bio: 'Believes in the healing power of plants.',
        role: 'botanist',
      },
    ];

    const createdUsers = await User.bulkCreate(usersData, { returning: true });

    for (const user of createdUsers) {
      await Address.create({
        owner: user.user_id,
        longitude: Math.random() * (180 - (-180)) + (-180),
        latitude: Math.random() * (90 - (-90)) + (-90),
        country: 'France',
        city: 'Saint-Grégoire',
        address: `Chez ${user.username}`,
        zip_code: 35760,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Suppression de toutes les adresses et de tous les utilisateurs créés
    await Address.destroy({ where: {} });
    await User.destroy({ where: {} });
  },
};
