import faker from 'faker/locale/pt_BR';
import { insertTransaction } from '../../src/repositories/transactionRepository';

function createTransactionBody() {
  const body = {
    description: faker.lorem.words(3),
    value: faker.datatype.number(),
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
