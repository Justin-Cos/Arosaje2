const request = require('supertest');
const app = require('../src/index');
const server = require('../src/index');
const testConfig = require('../config/testConfig.json');
const path = require('path');
const {close} = require("../src/sequelize");
const token = testConfig.token;
const seedUp = require('../src/seeders/20240129170544-seed').up;
const seedDown = require('../src/seeders/20240129170544-seed').down;

describe('Plant Types routes', () => {
    beforeAll(async () => {
        await seedDown()
        await seedUp()
    });
    it('should get all plant types', async () => {
        const res = await request(app)
            .get('/api/v1/plant-type')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    });
    it('should get a plant type by id', async () => {
        const onePlantType = await request(app)
            .get('/api/v1/plant-type')
            .set('Authorization', `Bearer ${token}`);

        const res = await request(app)
            .get('/api/v1/plant-type/' + onePlantType.body[0].plant_type_id)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.plant_type_id).toEqual(onePlantType.body[0].plant_type_id);
    });
    it('should create a new plant type and then update and delete it', async () => {
        const plantTypeData = {
            name: 'TestPlantType',
        };
        const res = await request(app)
            .post('/api/v1/plant-type')
            .set('Authorization', `Bearer ${testConfig.adminToken}`)
            .send({name: plantTypeData.name});
        expect(res.statusCode).toEqual(201);
        const plantTypeId = res.body.plant_type_id;
        const fetchRes = await request(app)
            .get(`/api/v1/plant-type/${plantTypeId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(fetchRes.statusCode).toEqual(200);
        expect(fetchRes.body.name).toEqual(plantTypeData.name);
        await request(app)
            .put(`/api/v1/plant-type/${plantTypeId}`)
            .set('Authorization', `Bearer ${testConfig.adminToken}`)
            .send({name: 'UpdatedPlantType'});
        const updateRes = await request(app)
            .get(`/api/v1/plant-type/${plantTypeId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(updateRes.statusCode).toEqual(200);
        expect(updateRes.body.name).toEqual('UpdatedPlantType');
        const deleteRes = await request(app)
            .delete(`/api/v1/plant-type/${plantTypeId}`)
            .set('Authorization', `Bearer ${testConfig.adminToken}`);
        expect(deleteRes.statusCode).toEqual(200);
        const fetchDeletedRes = await request(app)
            .get(`/api/v1/plant-type/${plantTypeId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(fetchDeletedRes.statusCode).toEqual(404);
    })
    it('should not create plantType without permission', async () => {
        const res = await request(app)
            .post('/api/v1/plant-type')
            .set('Authorization', `Bearer ${token}`)
            .field('name', 'TestPlantType')
        expect(res.statusCode).toEqual(403);
    })
afterAll(async () => {
    await seedDown();
    await new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
});
});