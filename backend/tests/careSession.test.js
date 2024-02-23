const request = require('supertest');
const app = require('../src/index');
const server = require('../src/index');
const testConfig = require('../config/testConfig.json');
const {calculateDist} = require("../src/utils");
const {close} = require("../src/sequelize");
const token = testConfig.token;
const seedUp = require('../src/seeders/20240129170544-seed').up;
const seedDown = require('../src/seeders/20240129170544-seed').down;

describe('CareSession routes', () => {
    beforeAll(async () => {
        await seedDown()
        await seedUp()
    });

    it('should create a new care session and then update then delete it', async () => {
        const user = await request(app)
            .get('/api/v1/user')
            .set('Authorization', `Bearer ${token}`);
        const plant = await request(app)
            .get('/api/v1/plant')
            .set('Authorization', `Bearer ${token}`);
        const address = await request(app)
            .get('/api/v1/address/user/' + user.body[0].user_id)
            .set('Authorization', `Bearer ${token}`);
        const careSessionData = {
            plant: plant.body[0].plant_id,
            caretaker: user.body[0].user_id,
            location: address.body[0].address_id,
            date_start: new Date(),
            date_end: new Date(),
        };
        const res = await request(app)
            .post('/api/v1/care-session')
            .set('Authorization', `Bearer ${token}`)
            .send(careSessionData);
        expect(res.statusCode).toEqual(201);
        const careSessionId = res.body.session_id;
        const fetchRes = await request(app)
            .get(`/api/v1/care-session/${careSessionId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(fetchRes.statusCode).toEqual(200);
        expect(fetchRes.body.plant).toEqual(careSessionData.plant);
        expect(fetchRes.body.caretaker).toEqual(careSessionData.caretaker);
        expect(fetchRes.body.location).toEqual(careSessionData.location);
        expect(new Date(fetchRes.body.date_start).getTime()).toEqual(new Date(careSessionData.date_start).getTime());
        expect(new Date(fetchRes.body.date_end).getTime()).toEqual(new Date(careSessionData.date_end).getTime());
        await request(app)
            .put(`/api/v1/care-session/${careSessionId}`)
            .set('Authorization', `Bearer ${testConfig.adminToken}`)
            .send({date_start: '2022-01-01T00:00:00.000Z'});
        const updateRes = await request(app)
            .get(`/api/v1/care-session/${careSessionId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(updateRes.statusCode).toEqual(200);
        expect(updateRes.body.date_start).toEqual('2022-01-01T00:00:00.000Z');

        const deleteRes = await request(app)
            .delete(`/api/v1/care-session/${careSessionId}`)
            .set('Authorization', `Bearer ${testConfig.adminToken}`);
        expect(deleteRes.statusCode).toEqual(200);
        const findDeletedCareSessionRes = await request(app)
            .get(`/api/v1/care-session/${careSessionId}`)
            .set('Authorization', `Bearer ${token}`);
        console.log(findDeletedCareSessionRes.body);
        expect(findDeletedCareSessionRes.statusCode).toEqual(404);
    });

    it('should get all next care sessions', async () => {
        const res = await request(app)
            .get('/api/v1/care-session/next')
            .set('Authorization', `Bearer ${token}`);
        for (let i = 0; i < res.body.length; i++) {
            expect(new Date(res.body[i].date_start).getTime()).toBeGreaterThan(new Date().getTime());
            expect(new Date(res.body[i].date_end).getTime()).toBeGreaterThan(new Date().getTime());
        }
    });

    it('should get all caresession within 300km', async () => {
        const user = await request(app)
            .get('/api/v1/user')
            .set('Authorization', `Bearer ${token}`);
        const address = await request(app)
            .get('/api/v1/address/user/' + user.body[0].user_id)
            .set('Authorization', `Bearer ${token}`);
        const res = await request(app)
            .get('/api/v1/care-session/nearby?maxDistance=300&address_id=' + address.body[0].address_id)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        for (let i = 0; i < res.body.length; i++) {
            const distance = calculateDist(address.body[0].latitude, address.body[0].longitude, res.body[i].Address.latitude, res.body[i].Address.longitude);
            expect(distance).toBeLessThanOrEqual(300);
        }
    });
    it('should get all active session', async () => {
        const res = await request(app)
            .get('/api/v1/care-session/active')
            .set('Authorization', `Bearer ${token}`)
        for (let i = 0; i < res.body.length; i++) {
            expect(new Date(res.body[i].date_end).getTime()).toBeGreaterThan(new Date().getTime());
        }
    });
    it('should get all previous session', async () => {
        const res = await request(app)
            .get('/api/v1/care-session/previous')
            .set('Authorization', `Bearer ${token}`)
        for (let i = 0; i < res.body.length; i++) {
            expect(new Date(res.body[i].date_end).getTime()).toBeLessThan(new Date().getTime());
        }
    });
    it('should get all available session', async () => {
        const res = await request(app)
            .get('/api/v1/care-session/available')
            .set('Authorization', `Bearer ${token}`)
        for (let i = 0; i < res.body.length; i++) {
            expect(new Date(res.body[i].date_start).getTime()).toBeGreaterThan(new Date().getTime());
        }
    });
    it('should find a session that has 1 caretaker then find all session where this user is caretaker', async () => {
        const careSessions = await request(app)
            .get('/api/v1/care-session')
            .set('Authorization', `Bearer ${token}`);
        const filteredCareSessions = careSessions.body.filter((session) => session.caretaker !== null);
        const careTakerId = filteredCareSessions.length > 0 ? filteredCareSessions[0].caretaker : null;
        const res = await request(app)
            .get('/api/v1/care-session?caretaker=' + careTakerId)
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200);
        for (let i = 0; i < res.body.length; i++) {
            expect(res.body[i].caretaker).toEqual(careTakerId);
        }
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