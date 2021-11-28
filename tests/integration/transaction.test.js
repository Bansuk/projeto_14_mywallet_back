import '../../src/setup.js';
import supertest from 'supertest';
import app from '../../src/app.js';
import { clearDatabase, closeConnection } from '../utils/database.js';
import { createTransaction } from '../factories/transactionFactory.js';
import { createSession } from '../factories/sessionFactory.js';

beforeEach(async () => {
  clearDatabase('transaction');
  clearDatabase('session');
  clearDatabase('user_account');
});

afterAll(async () => {
  clearDatabase('transaction');
  clearDatabase('session');
  clearDatabase('user_account');
  closeConnection();
});

describe('POST /transaction', () => {
  test('should return 201 when the provided transaction data is valid', async () => {
    const token = await createSession();
    const transaction = createTransaction();

    const result = await supertest(app)
      .post('/transaction')
      .send(transaction)
      .set('Authorization', `Bearer ${token}`);

    expect(result.status).toEqual(201);
  });
});
