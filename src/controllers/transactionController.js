import * as transactionValidation from '../validations/transactionValidation.js';
import * as transactionRepository from '../repositories/transactionRepository.js';

async function produceTransaction(req, res) {
  const { description, value } = req.body;
  const session = req.user;
  const userId = session.user_account_id;

  const isTransactionInputValid = transactionValidation.isTransactionInputValid(
    { description, value },
  );

  if (!isTransactionInputValid) return res.sendStatus(400);

  const transaction = await transactionRepository.insertTransaction({
    description,
    value,
    userId,
  });

  if (transaction) return res.sendStatus(201);

  return res.sendStatus(500);
}

async function receiveTransaction(req, res) {
  const session = req.user;

  const transactions = await transactionRepository.getTransactions(session);

  if (transactions) return res.status(200).send(transactions);
  return res.sendStatus(204);
}

async function receiveBalance(req, res) {
  const session = req.user;

  const balance = await transactionRepository.getBalance(session);

  if (balance) return res.status(200).send(balance);
  return res.sendStatus(204);
}

export { produceTransaction, receiveTransaction, receiveBalance };
