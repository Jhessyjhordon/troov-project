const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const bcrypt = require('bcrypt');

process.env.JWT_SECRET = 'testsecret';

jest.mock('../models/user');
jest.mock('bcrypt');

describe('POST /api/users/login', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return token when credentials are valid', async () => {
    User.findOne.mockResolvedValue({ _id: '123', password: 'hashed' });
    bcrypt.compare.mockResolvedValue(true);

    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'login@example.com', password: 'Password123!' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should return 400 when password is wrong', async () => {
    User.findOne.mockResolvedValue({ _id: '123', password: 'hashed' });
    bcrypt.compare.mockResolvedValue(false);

    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'login@example.com', password: 'WrongPassword' });

    expect(res.statusCode).toBe(400);
  });
});
