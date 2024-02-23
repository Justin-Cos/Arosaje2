const request = require('supertest');
const app = require('../src/index');
const server = require('../src/index');
const testConfig = require('../config/testConfig.json');
const {valueOf} = require("jest");
const {calculateDist} = require("../src/utils");
const {close} = require("../src/sequelize");
const token = testConfig.token;
const seedUp = require('../src/seeders/20240129170544-seed').up;
const seedDown = require('../src/seeders/20240129170544-seed').down;

describe('Addresses routes', () => {
    beforeAll(async () => {
        await seedDown()
        await seedUp()
    });

    it('should get all addresses', async () => {
        const res = await request(app)
            .get('/api/v1/address')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
        for (let i = 0; i < res.body.length; i++) {
            expect(res.body[i]).toHaveProperty('address_id');
            expect(res.body[i]).toHaveProperty('city');
            expect(res.body[i]).toHaveProperty('zip_code');
            expect(res.body[i]).toHaveProperty('country');
            expect(res.body[i]).toHaveProperty('longitude');
            expect(res.body[i]).toHaveProperty('latitude');
        }
        await request(app)
            .get('/api/v1/address/' + res.body[0].address_id)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                console.log(res.body);
                expect(res.body).toHaveProperty('address_id');
                expect(res.body).toHaveProperty('city');
                expect(res.body).toHaveProperty('zip_code');
                expect(res.body).toHaveProperty('country');
                expect(res.body).toHaveProperty('longitude');
                expect(res.body).toHaveProperty('latitude');
            });

    });
    it('should create update and delete an address', async () => {
        const user = await request(app)
            .get('/api/v1/user')
            .set('Authorization', `Bearer ${token}`);

        const addressData = {
            owner: user.body[0].user_id,
            longitude: 0,
            latitude: 0,
            country: 'France',
            city: 'Paris',
            address: '1 rue de Paris',
            zip_code: '75001'
        };
        const address = await request(app)
            .post('/api/v1/address')
            .set('Authorization', `Bearer ${token}`)
            .send(addressData)
        expect(address.statusCode).toEqual(201);
        expect(address.body).toHaveProperty('address_id');
        expect(address.body).toHaveProperty('city');
        expect(address.body).toHaveProperty('zip_code');
        expect(address.body).toHaveProperty('country');
        expect(address.body).toHaveProperty('longitude');
        expect(address.body).toHaveProperty('latitude');
        const updateAdress = await request(app)
            .put('/api/v1/address/' + address.body.address_id)
            .set('Authorization', `Bearer ${testConfig.adminToken}`)
            .send({
                owner: user.body[0].user_id,
                longitude: 2,
                latitude: 2,
                country: 'Allemagne',
                city: 'Berlin',
                address: '2 rue de Berlin',
                zip_code: '99999'
            })
        console.log(updateAdress.body);
        expect(updateAdress.statusCode).toEqual(200);
        expect(updateAdress.body.address.owner).toEqual(user.body[0].user_id);
        expect(updateAdress.body.address.longitude).toEqual(2);
        expect(updateAdress.body.address.latitude).toEqual(2);
        expect(updateAdress.body.address.country).toEqual('Allemagne');
        expect(updateAdress.body.address.city).toEqual('Berlin');
        expect(updateAdress.body.address.address).toEqual('2 rue de Berlin');
        expect(updateAdress.body.address.zip_code).toEqual('99999');
        await request(app)
            .delete('/api/v1/address/' + address.body.address_id)
            .set('Authorization', `Bearer ${testConfig.adminToken}`)
            .expect(200)
        const findDeletedAddressRes = await request(app)
            .get(`/api/v1/address/${address.body.address_id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(findDeletedAddressRes.statusCode).toEqual(404);
    });
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