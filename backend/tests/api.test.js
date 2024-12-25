const request = require('supertest');
const app = require('../app'); // Assurez-vous que l'export d'Express dans votre server.js est correct
const mongoose = require('mongoose');

describe('GET /api/test', () => {
    it('should return API fonctionne bien', async () => {
        const response = await request(app).get('/api/test');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('API fonctionne bien !');
    });
});

afterAll(async () => {
    await mongoose.connection.close(); // Fermeture de la connexion MongoDB
});