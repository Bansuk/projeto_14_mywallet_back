import faker from 'faker/locale/pt_BR';
import { insertTransaction } from '../../src/repositories/transactionRepository';

function createTransactionBody() {
  const body = {
    description: faker.lorem.words(3),
    value: faker.datatype.number({ min: 1, max: 99999, precision: 0.01 }),
  };

  return body;
}

async function createTransaction(user = {}) {
  const transaction = createTransactionBody();
  const result = await insertTransaction({
    description: transaction.description,
    value: transaction.value,
    userId: user,
  });

  transaction.id = result.id;

  return transaction;
}

export { createTransactionBody, createTransaction };
