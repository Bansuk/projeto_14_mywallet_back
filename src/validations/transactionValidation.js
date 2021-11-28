import { transactionSchema } from './schemes.js';

function isTransactionInputValid({ description, value }) {
  if (transactionSchema.validate({ description, value }).error) return false;
  return true;
}

export { isTransactionInputValid };
