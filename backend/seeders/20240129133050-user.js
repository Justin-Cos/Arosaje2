
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            {
            username: 'john_doe',
            email: 'john@example.com',
            password: 'hashed_password',
            profile_picture:'',
            role: 'botanist',
        }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
