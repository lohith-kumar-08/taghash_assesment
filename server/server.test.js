const request = require('supertest');
const app = require('./server');
const knex = require('./db/db');

describe('Server Endpoints', () => {
   
    it('GET / should return Server Started', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('Server Started');
    });

    it('POST /vote should return 200 for valid data', async () => {
        const res = await request(app)
            .post('/vote')
            .send({
                name: 'Prajwal',
                voting_choice: true,
                casted_at: '2024-06-02'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('Vote successfully cast');
    });

    it('POST /vote should return 400 for invalid data', async () => {
        const res = await request(app)
            .post('/vote')
            .send({
                name: 123, 
                voting_choice: 'yes',
                casted_at: 'invalid-date'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual('Invalid input data');
    });

    it('GET /data should return data', async () => {
        const res = await request(app).get('/data');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
    });

    it('GET /counts should return 400 for invalid voting_choice', async () => {
        const res = await request(app).get('/counts?voting_choice=invalid');
        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual('Invalid voting_choice value. It should be true or false.');
    });

    it('GET /results should return results', async () => {
        const res = await request(app).get('/results');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
    });
});
