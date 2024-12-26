const mongoose = require('mongoose');
const User = require('../models/user');
const ObjectModel = require('../models/object');
const bcrypt = require('bcrypt');

require('dotenv').config();

if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in your environment variables');
}


describe('Mongoose Models', () => {
    // Connecter à la base de données avant d'exécuter les tests
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    // Nettoyer les collections avant chaque test
    beforeEach(async () => {
        await User.deleteMany(); // Supprime tous les utilisateurs pour des tests indépendants
    });

    // Test : Créer et enregistrer un utilisateur valide
    it('should create and save a user successfully', async () => {
        const validUser = new User({
            email: `test@example.com`,
            password: 'Password123!',
        });

        const savedUser = await validUser.save();

        expect(savedUser._id).toBeDefined(); // Vérifie que l'utilisateur a un ID généré
        expect(savedUser.email).toBe(`test@example.com`);
        // Vérifie que le mot de passe est hashé
        const isPasswordValid = await bcrypt.compare('Password123!', savedUser.password);
        expect(isPasswordValid).toBe(true);
    });

    // Test : Validation échoue pour un champ requis manquant
    it('should fail validation if a required field is missing', async () => {
        const invalidUser = new User({ password: 'Password123!' }); // Champ "email" manquant

        let err;
        try {
            await invalidUser.save();
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined(); // Vérifie qu'une erreur est renvoyée
        expect(err.errors.email).toBeDefined(); // Vérifie que l'erreur est liée au champ "email"
    });

    // Test : Validation échoue pour un email invalide
    it('should fail validation for invalid email', async () => {
        const invalidUser = new User({
            email: 'invalid-email',
            password: 'Password123!',
        });

        let err;
        try {
            await invalidUser.save();
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined();
        expect(err.errors.email).toBeDefined();
    });

    it('should create and save an object linked to a user successfully', async () => {
        const user = new User({
            email: `test${Date.now()}@example.com`,
            password: 'Password123',
        });
        await user.save();

        const object = new ObjectModel({
            name: 'Sample Object',
            description: 'This is a sample description',
            userId: user._id, // Lier l’objet à l’utilisateur créé
        });

        const savedObject = await object.save();
        expect(savedObject._id).toBeDefined();
        expect(savedObject.userId.toString()).toBe(user._id.toString());
    });

    // Fermer la connexion après les tests
    afterAll(async () => {
        await mongoose.connection.close();
    });
});

describe('Mongoose Models - Object', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    beforeEach(async () => {
        await ObjectModel.deleteMany();
    });

    it('should create and save an object linked to a user successfully', async () => {
        const validObject = new ObjectModel({
            name: 'Test Object',
            description: 'This is a test object',
            userId: new mongoose.Types.ObjectId(),
        });

        const savedObject = await validObject.save();
        expect(savedObject._id).toBeDefined();
        expect(savedObject.name).toBe('Test Object');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});