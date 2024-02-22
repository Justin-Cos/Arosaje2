const request = require('supertest');
const app = require('../src/index');
const server = require('../src/index');
const path = require('path');
const testConfig = require('../config/testConfig.json');
const token = testConfig.token;
const seedUp = require('../src/seeders/20240129170544-seed').up;
const seedDown = require('../src/seeders/20240129170544-seed').down;

describe('Plant routes', () => {
    beforeAll(async () => {
        await seedUp()
    });

    it('should get all plants', async () => {
        const res = await request(app)
            .get('/api/v1/plant')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
    });

    it('should create a new plant and then delete it', async () => {
        const user = await request(app)
            .get('/api/v1/user')
            .set('Authorization', `Bearer ${token}`);
        const plantType = await request(app)
            .get('/api/v1/plant-type')
            .set('Authorization', `Bearer ${token}`);

        const plantData = {
            name: 'TestPlant',
            plant_type: plantType.body[0].plant_type_id,
            owner_id: user.body[0].user_id,
            indoor: true,
        };

        const res = await request(app)
            .post('/api/v1/plant')
            .set('Authorization', `Bearer ${token}`)
            .field('name', plantData.name)
            .field('plant_type', plantData.plant_type)
            .field('owner_id', plantData.owner_id)
            .field('indoor', plantData.indoor)
            .attach('image_file', path.join(__dirname, 'test_data/test_image.jpg'));

        expect(res.statusCode).toEqual(201);
        console.log(res.body);
        plantId = res.body.plant_id;

        // Fetch the plant to verify it was created correctly
        const fetchRes = await request(app)
            .get(`/api/v1/plant/${plantId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(fetchRes.statusCode).toEqual(200);
        expect(fetchRes.body.name).toEqual(plantData.name);
        expect(fetchRes.body.plant_type).toEqual(plantData.plant_type);
        expect(fetchRes.body.owner).toEqual(plantData.owner_id);
        expect(fetchRes.body.indoor).toEqual(plantData.indoor);
        await request(app)
            .delete(`/api/v1/plant/${plantId}`)
            .set('Authorization', `Bearer ${token}`);
        const findDeletedPlantRes = await request(app)
            .get(`/api/v1/plant/${plantId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(findDeletedPlantRes.statusCode).toEqual(404);
    });


    it('should update a plant by id', async () => {
        const plant = await request(app)
            .get('/api/v1/plant')
            .set('Authorization', `Bearer ${token}`);
        const plantId = plant.body[0].plant_id;
        const res = await request(app)
            .put(`/api/v1/plant/${plantId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'UpdatedPlant',
                plant_type: plant.body[0].plant_type,
                owner: plant.body[0].owner,
                indoor: plant.body[0].indoor,
                image: plant.body[0].image,
            });

        expect(res.statusCode).toEqual(200);
        console.log(res.body);
        expect(res.body.plant.name).toEqual('UpdatedPlant');
    });

    it('should delete a plant by id', async () => {
        const plant = await request(app)
            .get('/api/v1/plant')
            .set('Authorization', `Bearer ${token}`);
        const res = await request(app)
            .delete(`/api/v1/plant/${plant.body[0].plant_id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
    });
    afterAll(done => {
        seedDown()
        server.close(done);
    });
});