'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('PlantsTypes', [
            { name: 'Plante d\'intérieur', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Plante d\'extérieur', createdAt: new Date(), updatedAt: new Date() },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('PlantsTypes', null, {});
    }
};
