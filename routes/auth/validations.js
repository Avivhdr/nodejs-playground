const Joi = require('joi');

const validateUserDetails = (data) => {
  const schema = Joi
    .object({
      username: Joi
        .string()
        .min(6)
        .required(),
      email: Joi
        .string()
        .min(6)
        .required()
        .email(),
      password: Joi
        .string()
        .min(6)
        .required(),
    });
  return schema.validate(data);
};

const validateLoginDetails = (data) => {
  const schema = Joi.object({
    email: Joi
      .string()
      .min(6)
      .required()
      .email(),
    password: Joi
      .string()
      .min(6)
      .required(),
  });
  return schema.validate(data);
};

module.exports = {
  validateUserDetails,
  validateLoginDetails,
};
