'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const indoorTypeId = await queryInterface.rawSelect('PlantsTypes', {
            where: {
                name: 'Plante d\'intérieur'
            }
        }, ['plant_type_id']);

        const outdoorTypeId = await queryInterface.rawSelect('PlantsTypes', {
            where: {
                name: 'Plante d\'extérieur'
            }
        }, ['plant_type_id']);

        return queryInterface.bulkInsert('Plants', [
            { name: 'Ficus', type_id: indoorTypeId, createdAt: new Date(), updatedAt: new Date() },
            { name: 'Aloe Vera', type_id: indoorTypeId, createdAt: new Date(), updatedAt: new Date() },
            { name: 'Lavande', type_id: outdoorTypeId, createdAt: new Date(), updatedAt: new Date() },
            { name: 'Rosier', type_id: outdoorTypeId, createdAt: new Date(), updatedAt: new Date() },
            { name: 'Orchidée', type_id: indoorTypeId, createdAt: new Date(), updatedAt: new Date() },
            { name: 'Chrysanthème', type_id: outdoorTypeId, createdAt: new Date(), updatedAt: new Date() },
            { name: 'Pothos', type_id: indoorTypeId, createdAt: new Date(), updatedAt: new Date() },
            { name: 'Hortensia', type_id: outdoorTypeId, createdAt: new Date(), updatedAt: new Date() },
            { name: 'Spathiphyllum', type_id: indoorTypeId, createdAt: new Date(), updatedAt: new Date() },
            { name: 'Bougainvillier', type_id: outdoorTypeId, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Plants', null, {});
    }
};
