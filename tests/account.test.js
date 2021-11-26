import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import { clearDatabase, closeConnection } from './utils/database.js';
import { createUser } from './factories/userFactory.js';
import { createBody } from './factories/bodyFactory.js';

async function postSignUp(body) {
  return supertest(app).post('/sign-up').send(body);
}

beforeEach(async () => {
  clearDatabase('session');
  clearDatabase('user_account');
});

afterAll(async () => {
  clearDatabase('session');
  clearDatabase('user_account');
  closeConnection();
});

describe('POST /sign-up', () => {
  test('should return 400 for invalid body', async () => {
    const body = {};
    const result = await postSignUp(body);

    expect(result.status).toEqual(400);
  });

  test('should return 409 for email already in user', async () => {
    const user = await createUser();
    const body = user;
    const result = await postSignUp(body);

    expect(result.status).toEqual(409);
  });

  test('should return 201 for valid data', async () => {
    const body = await createBody();
    const result = await postSignUp(body);

    expect(result.status).toEqual(201);
  });
});

describe('POST /sign-in', () => {
  test('should return 400 for invalid body', async () => {
    const body = {};
    const result = await supertest(app).post('/sign-in').send(body);

    expect(result.status).toEqual(400);
  });

  test('should return 401 for invalid login data', async () => {
    const wrongPassword = 'Fy%0tuq8oi2gf14@';
    const body = await createUser();
    body.password = wrongPassword;
    const result = await supertest(app).post('/sign-in').send(body);

    expect(result.status).toEqual(401);
  });

  test('should return 200 for valid login data', async () => {
    const user = await createUser();
    const body = { email: user.email, password: user.cleanPassword };
    const result = await supertest(app).post('/sign-in').send(body);

    expect(result.status).toEqual(200);
  });
});
