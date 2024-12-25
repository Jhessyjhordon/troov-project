const mongoose = require('mongoose');
const User = require('../models/user');
const ObjectModel = require('../models/object');

require('dotenv').config();

if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in your environment variables');
}


describe('MongoDB Models', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create and save a user successfully', async () => {
        const userData = { email: 'test@example.com', password: 'password123' };
        const user = new User(userData);
        const savedUser = await user.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
    });

    it('should create and save an object linked to a user successfully', async () => {
        const user = await User.findOne({ email: 'test@example.com' });
        const objectData = { name: 'Test Object', description: 'A test object', userId: user._id };
        const object = new ObjectModel(objectData);
        const savedObject = await object.save();
        expect(savedObject._id).toBeDefined();
        expect(savedObject.userId).toEqual(user._id);
    });
});
