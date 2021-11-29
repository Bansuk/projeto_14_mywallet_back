import '../../src/setup.js';
import supertest from 'supertest';
import app from '../../src/app.js';
import { clearDatabase, closeConnection } from '../utils/database.js';
import {
  createTransaction,
  createTransactionBody,
} from '../factories/transactionFactory.js';
import { createSession } from '../factories/sessionFactory.js';

async function postTransaction(body, token) {
  return supertest(app)
    .post('/transaction')
    .send(body)
    .set('Authorization', `Bearer ${token}`);
}

async function getTransactions(token) {
  return supertest(app)
    .get('/transactions')
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

describe('POST /transaction', () => {
  test('should return 400 when the provided transaction data is invalid', async () => {
    const { token } = await createSession();
    const transaction = {};
    const result = await postTransaction(transaction, token);

    expect(result.status).toEqual(400);
  });

  test('should return 401 when token is invalid', async () => {
    const token = '';
    const transaction = createTransactionBody();
    const result = await postTransaction(transaction, token);

    expect(result.status).toEqual(401);
  });

  test('should return 201 when the provided transaction data is valid', async () => {
    const { token } = await createSession();
    const transaction = createTransactionBody();
    const result = await postTransaction(transaction, token);

    expect(result.status).toEqual(201);
  });
});

describe('GET /transactions', () => {
  test('should return 401 when token is not provided', async () => {
    const result = await supertest(app).get('/transactions');

    expect(result.status).toEqual(401);
  });

  test("should return 204 when there aren't available transacations", async () => {
    const { token } = await createSession();
    const result = await getTransactions(token);

    expect(result.status).toEqual(204);
  });

  test('should return 200 when there are available transactions', async () => {
    const { token, user } = await createSession();
    await createTransaction(user.id);
    const result = await getTransactions(token);

    expect(result.status).toEqual(200);
    expect(result.body).toHaveLength(1);
  });
});

describe('GET /balance', () => {
  test('should return 401 when token is not provided', async () => {
    const result = await supertest(app).get('/balance');

    expect(result.status).toEqual(401);
  });

  test("should return 204 when there aren't available transacations", async () => {
    const { token } = await createSession();
    const result = await supertest(app)
      .get('/balance')
      .set('Authorization', `Bearer ${token}`);

    expect(result.status).toEqual(204);
  });

  test('should return 200 when there are available transactions', async () => {
    const { token, user } = await createSession();
    const fstTransaction = await createTransaction(user.id);
    const scdTransaction = await createTransaction(user.id);
    const thdTransaction = await createTransaction(user.id);
    const balance = fstTransaction.value + scdTransaction.value + thdTransaction.value;

    const result = await supertest(app)
      .get('/balance')
      .set('Authorization', `Bearer ${token}`);

    expect(result.status).toEqual(200);
    expect(result.text).toEqual(balance.toFixed(2));
  });
});
