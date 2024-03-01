const request = require('supertest');
const app = require('../src/index');
const server = require('../src/index');
const path = require('path');
const testConfig = require('../config/testConfig.json');
const {close} = require("../src/sequelize");
const token = testConfig.token;
const seedUp = require('../src/seeders/20240129170544-seed').up;
const seedDown = require('../src/seeders/20240129170544-seed').down;
describe('User routes', () => {
    beforeAll(async () => {
        await seedDown()
        await seedUp()
    });

    it('should get all users', async () => {
        const res = await request(app)
            .get('/api/v1/user')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
    });
    it('try accessing ressources with bad authent', async () => {

        const res = await request(app)
            .get('/api/v1/user')
            .set('Authorization', `Bearer ${testConfig.wrongSignatureToken}`)
        expect(res.statusCode).toEqual(403);
        return request(app)
            .get('/api/v1/user')
            .expect(401);

    });

    it('should get all botanists', async () => {
        const res = await request(app)
            .get('/api/v1/user/botanist')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    });

    it('should register a user and then login with good/bad credentials ', async () => {
        const res = await request(app)
            .post('/api/v1/user/register')
            .field('username', 'testuser')
            .field('email', 'test@test.com')
            .field('password', 'testpassword')
            .attach('image_file', path.join(__dirname, 'test_data/test_image.jpg'));
        expect(res.statusCode).toEqual(201);
        const resLogin = await request(app)
            .post('/api/v1/user/login')
            .set('Authorization', `Bearer ${token}`)
            .send({
                username: 'testuser',
                password: 'testpassword'
            });
        expect(resLogin.statusCode).toEqual(200);
        const resLoginFail = await request(app)
            .post('/api/v1/user/login')
            .set('Authorization', `Bearer ${token}`)
            .send({
                username: 'testuser',
                password: 'wrongPwd'
            });
        expect(resLoginFail.statusCode).toEqual(401);

    });

    it('create user then update and delete it using its token', async () => {
        const res = await request(app)
            .post('/api/v1/user/register')
            .field('username', 'test2user')
            .field('email', 'test2@test.com')
            .field('password', 'test2password')
            .attach('image_file', path.join(__dirname, 'test_data/test_image.jpg'));
        expect(res.statusCode).toEqual(201);
        const userToken = res.body.token;
        const resUpdate = await request(app)
            .put('/api/v1/user/' + res.body.user_id)
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                username: 'updateduser',
                email: 'updateduser@test.com',
                password: 'updatedpassword',
                role: 'botanist'
            });
        expect(resUpdate.statusCode).toEqual(200);
        const updatedUser = await request(app)
            .get('/api/v1/user/' + res.body.user_id)
            .set('Authorization', `Bearer ${token}`);
        expect(updatedUser.body.username).toEqual('updateduser');
        expect(updatedUser.body.email).toEqual('updateduser@test.com');
        expect(updatedUser.body.role).toEqual('botanist');
        const resDelete = await request(app)
            .delete('/api/v1/user/' + res.body.user_id)
            .set('Authorization', `Bearer ${userToken}`);
        expect(resDelete.statusCode).toEqual(200);
        const deletedUser = await request(app)
            .get('/api/v1/user/' + res.body.user_id)
            .set('Authorization', `Bearer ${token}`);
        expect(deletedUser.statusCode).toEqual(404);
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