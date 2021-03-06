import * as userValidation from '../validations/userValidation.js';
import * as userService from '../services/userService.js';

async function signUp(req, res) {
  const { name, email, password } = req.body;

  const isSignUpInputValid = userValidation.isSignUpInputValid({
    name,
    email,
    password,
  });

  if (!isSignUpInputValid) return res.sendStatus(400);

  const wasEmailFound = await userService.wasEmailFound(email);

  if (wasEmailFound) return res.sendStatus(409);

  const user = await userService.createUser({ name, email, password });

  if (user) return res.sendStatus(201);

  return res.sendStatus(500);
}

async function signIn(req, res) {
  const { email, password } = req.body;

  const isSignInInputVlid = userValidation.isSignInInputValid({
    email,
    password,
  });

  if (!isSignInInputVlid) return res.sendStatus(400);

  const session = await userService.authenticate({ email, password });

  if (session) return res.status(200).send(session);
  return res.sendStatus(401);
}

async function signOut(req, res) {
  const { token } = req.user;

  const wasSessionClosed = await userService.removeSession(token);

  if (wasSessionClosed) return res.sendStatus(200);

  return res.sendStatus(500);
}

export { signUp, signIn, signOut };
