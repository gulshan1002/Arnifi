const request = require('supertest');
const app = require('../app');

describe('Auth and Blog API Endpoints', () => {
    const username = `Test${Date.now()}`;
    const email = `test${Date.now()}gmail.com`;
    const password = 'Test@1234';

    it('POST /auth/signup - User signup', async () => {
        const response = await request(app)
            .post('/auth/signup')
            .send({
                username,
                email,
                password
            });
            console.log(response.body);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('data');
    });

    it('POST /auth/login - User login', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                email,
                password
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('token');
    });
});

afterAll(async () => {
    // If you use mongoose directly:
    const mongoose = require('mongoose');
    await mongoose.connection.close();
});