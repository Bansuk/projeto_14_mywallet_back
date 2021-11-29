import '../../src/setup.js';
import supertest from 'supertest';
import app from '../../src/app.js';
import { clearDatabase, closeConnection } from '../utils/database.js';
import { createUser, createUserBody } from '../factories/userFactory.js';
import { createSession } from '../factories/sessionFactory.js';

async function postSignUp(body) {
  return supertest(app).post('/sign-up').send(body);
}

async function postSignIn(body) {
  return supertest(app).post('/sign-in').send(body);
}

async function deleteSignOut(token) {
  return supertest(app)
    .delete('/sign-out')
    .set('Authorization', `Bearer ${token}`);
}

beforeEach(async () => {
  await clearDatabase('transaction');
  await clearDatabase('session');
  await clearDatabase('user_account');
});

afterAll(async () => {
  await clearDatabase('transaction');
  await clearDatabase('session');
  await clearDatabase('user_account');
  await closeConnection();
});

describe('POST /sign-up', () => {
  test('should return 400 when body is invalid', async () => {
    const body = {};
    const result = await postSignUp(body);

    expect(result.status).toEqual(400);
  });

  test('should return 409 when email provided is already in use', async () => {
    const user = await createUser();
    const result = await postSignUp(user);

    expect(result.status).toEqual(409);
  });

  test('should return 201 when the data provided is valid', async () => {
    const body = createUserBody();
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
    const result = await supertest(app).delete('/sign-out');

    expect(result.status).toEqual(401);
  });

  test('should return 401 when token is invalid', async () => {
    const invalidToken = '';
    const result = await deleteSignOut(invalidToken);

    expect(result.status).toEqual(401);
  });

  test('should return 200 when token is valid ', async () => {
    const { token } = await createSession();
    const result = await deleteSignOut(token);

    expect(result.status).toEqual(200);
  });
});
