import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import { clearDatabase, closeConnection } from './utils/database.js';
import { createUser } from './factories/userFactory.js';
import { createBody } from './factories/bodyFactory.js';

async function postSignUp(body) {
  return supertest(app).post('/sign-up').send(body);
}

async function postSignIn(body) {
  return supertest(app).post('/sign-in').send(body);
}

async function deleteSignOut(body, token) {
  return supertest(app)
    .delete('/sign-out')
    .send(body)
    .set('Authorization', `Bearer ${token}`);
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
  test('should return 400 when body is invalid', async () => {
    const body = {};
    const result = await postSignUp(body);

    expect(result.status).toEqual(400);
  });

  test('should return 409 when email provided is already in use', async () => {
    const user = await createUser();
    const body = user;
    const result = await postSignUp(body);

    expect(result.status).toEqual(409);
  });

  test('should return 201 when the data provided is valid', async () => {
    const body = await createBody();
    const result = await postSignUp(body);

    expect(result.status).toEqual(201);
  });
});

describe('POST /sign-in', () => {
  test('should return 400 when body is invalid', async () => {
    const body = {};
    const result = await postSignIn(body);

    expect(result.status).toEqual(400);
  });

  test('should return 401 when the provided login data is invalid', async () => {
    const wrongPassword = 'Fy%0tuq8oi2gf14@';
    const body = await createUser();
    body.password = wrongPassword;
    const result = await postSignIn(body);

    expect(result.status).toEqual(401);
  });

  test('should return 200 when the provided login data is valid', async () => {
    const user = await createUser();
    const body = { email: user.email, password: user.cleanPassword };
    const result = await postSignIn(body);

    expect(result.status).toEqual(200);
  });
});

describe('DELETE /sign-out', () => {
  test('should return 401 when token is not provided', async () => {
    const body = {};
    const result = await supertest(app).delete('/sign-out').send(body);

    expect(result.status).toEqual(401);
  });

  test('should return 401 when token is invalid', async () => {
    const body = {};
    const invalidToken = '';
    const result = await deleteSignOut(body, invalidToken);

    expect(result.status).toEqual(401);
  });

  test('should return 200 when token is valid ', async () => {
    const user = await createUser();
    const body = { email: user.email, password: user.cleanPassword };
    const token = await postSignIn(body);
    const result = await deleteSignOut(body, token.text);

    expect(result.status).toEqual(200);
  });
});
