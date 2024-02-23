const request = require('supertest');
const app = require('../src/index');
const server = require('../src/index');
const testConfig = require('../config/testConfig.json');
const path = require('path');
const token = testConfig.token;
const seedUp = require('../src/seeders/20240129170544-seed').up;
const seedDown = require('../src/seeders/20240129170544-seed').down;

describe('Comment routes', () => {
    beforeAll(async () => {
        await seedDown()
        await seedUp()
    });
    it('should get all comments', async () => {
        const res = await request(app)
            .get('/api/v1/comment')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    });
    it('should get a comment by id', async () => {
        const comments = await request(app)
            .get('/api/v1/comment')
            .set('Authorization', `Bearer ${token}`);
        expect(comments.statusCode).toEqual(200);

        const res = await request(app)
            .get('/api/v1/comment/' + comments.body[0].id_comment)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.id_comment).toEqual(comments.body[0].id_comment);
    });
    it('should create a new comment and then update then delete it', async () => {
        const user = await request(app)
            .get('/api/v1/user')
            .set('Authorization', `Bearer ${token}`);
        const commentData = {
            author: user.body[0].user_id,
            author_role: 'owner',
            date: '2022-01-01T00:00:00.000Z',
            content: 'Test content',
        };
        const res = await request(app)
            .post('/api/v1/comment')
            .set('Authorization', `Bearer ${token}`)
            .field('author', commentData.author)
            .field('author_role', commentData.author_role)
            .field('date', commentData.date)
            .field('content', commentData.content)
            .attach('image', path.join(__dirname, 'test_data/test_image.jpg'))
        expect(res.statusCode).toEqual(201);
        const commentId = res.body.id_comment;
        console.log(commentId);
        const fetchRes = await request(app)
            .get(`/api/v1/comment/${commentId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(fetchRes.statusCode).toEqual(200);
        expect(fetchRes.body.author).toEqual(commentData.author);
        expect(fetchRes.body.author_role).toEqual(commentData.author_role);
        expect(new Date(fetchRes.body.date).getTime()).toEqual(new Date(commentData.date).getTime());
        expect(fetchRes.body.content).toEqual(commentData.content);
        await request(app)
            .put(`/api/v1/comment/${commentId}`)
            .set('Authorization', `Bearer ${testConfig.adminToken}`)
            .send({content: 'Updated content'});
        const updateRes = await request(app)
            .get(`/api/v1/comment/${commentId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(updateRes.statusCode).toEqual(200);
        expect(updateRes.body.content).toEqual('Updated content');
        const deleteRes = await request(app)
            .delete(`/api/v1/comment/${commentId}`)
            .set('Authorization', `Bearer ${testConfig.adminToken}`);
        expect(deleteRes.statusCode).toEqual(200);
        const fetchDeletedRes = await request(app)
            .get(`/api/v1/comment/${commentId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(fetchDeletedRes.statusCode).toEqual(404);
    });
    afterAll(async () => {
        await seedDown()
        server.close()
    })
});