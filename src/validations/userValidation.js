import { singUpSchema } from './schemes.js';

function isSignUpInputValid({ name, email, password }) {
  if (singUpSchema.validate({ name, email, password }).error) return false;
  return true;
}

export { isSignUpInputValid };
