const router = require('../api/server.js');
const request = require('supertest');

describe('auth router', function() {
    describe('test environment', function() {
        it('should use the testing environment', function() {
            expect(process.env.DB_ENV).toBe('testing');
        })
    })
    describe('POST /register', function() {
        it('responds with 201 created,', async function() {
            await request(router)
            // .set('Content-Type', 'application/json')
            .post('/api/auth/register')
            .send({
                username: "michael",
                password: "pass"
            })
            .then(res => {
                expect(res.status).toBe(201)
            })
           
        });
        it('responds with json object', function() {
            return request(router)
            .post('/api/auth/register')
            .send({
                username: "greg",
                password: "pass"
            })
            .then(res => {
                expect(res.type).toMatch(/json/);
            })
        })
    });

    describe('Post /login', function() {
       
        it('responds with 200 created,', function() {
            return request(router)
            // .set('Content-Type', 'application/json')
            .post('/api/auth/login')
            .send({
                username: "michael",
                password: "pass"
            })
            .then(res => {
                expect(res.status).toBe(200)
            })
           
        });
        it('responds with 200 created', function() {
            return request(router)
            // .set('Content-Type', 'application/json')
            .post('/api/auth/login')
            .send({
                username: "damon",
                password: "pass"
            })
            .then(res => {
                expect(res.type).toMatch(/json/)
            })
           
        });
    })
});