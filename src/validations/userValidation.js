import { signUpSchema, signInSchema } from './schemes.js';

function isSignUpInputValid({ name, email, password }) {
  if (signUpSchema.validate({ name, email, password }).error) return false;
  return true;
}

function isSignInInputValid({ email, password }) {
  if (signInSchema.validate({ email, password }).error) return false;
  return true;
}

export { isSignUpInputValid, isSignInInputValid };
