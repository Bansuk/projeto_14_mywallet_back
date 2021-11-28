import joi from 'joi';

const signUpSchema = joi.object({
  name: joi
    .string()
    .min(2)
    .max(255)
    .pattern(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    )
    .required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,64}$/),
});

const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,64}$/),
});

const transactionSchema = joi.object({
  description: joi.string().max(30).required(),
  value: joi.number().precision(2).required(),
});

export { signUpSchema, signInSchema, transactionSchema };
