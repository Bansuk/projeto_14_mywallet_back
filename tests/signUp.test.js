import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import { clearDatabase, closeConnection } from './utils/database.js';
import { createUser } from './factories/userFactory.js';

let user;

async function postSignUp(body) {
  return supertest(app).post('/sign-up').send(body);
}

beforeAll(async () => {
  user = await createUser();
});

afterEach(async () => {
  clearDatabase('user_account');
});

afterAll(async () => {
  clearDatabase('user_account');
  closeConnection();
});

describe('POST /sign-up', () => {
  test('should return 400 for invalid body', async () => {
    const body = {};
    const result = await postSignUp(body);

    expect(result.status).toEqual(400);
  });

  test('should return 201 for valid data', async () => {
    const body = user;
    const result = await postSignUp(body);

    expect(result.status).toEqual(201);
  });

  test('should return 409 for email already in user', async () => {
    const body = user;
    const result = await postSignUp(body);

    expect(result.status).toEqual(409);
  });
});
