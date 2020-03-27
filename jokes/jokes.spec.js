const router = require('../api/server.js');
const request = require('supertest');

describe('jokes router', function() {
    describe('test environment', function() {
        it('should use the testing environment', function() {
            expect(process.env.DB_ENV).toBe('testing');
        })
    })
    describe('GET /', function() {
        it('not allow user to login without correct token', function() {
            //make a request to the api
            return request(router)
            // .set('Content-Type', 'application/json')
            .get('/api/jokes')
            .set('Authorization', "incorrect token")
            .then(res => {
                expect(res.body.message).toBe("Invalid Credentials");
            })
        })
        it('should return json', function() {
            //make a request to the api
            return request(router).get('/api/jokes').then(res => {
                expect(res.type).toMatch(/json/);
            })
        })
        it('should return status 200 with proper token', function() {
            return request(router)
            .post('/api/auth/login')
            .send({
                username: "damon",
                password: "pass"
            })
            .then(res => {
                expect(res.body).toHaveProperty("token")
                const response = res.body;
                const token = response.token;
                console.log(token)

                return request(router)
                .get('/api/jokes')
                .set('Authorization', token)
                .then(res => {
                    expect(res.status).toBe(200)
                })
                
            })
        })
    
    })
})    