const Joi = require('joi');

const validatePost = (data) => {
  const schema = Joi
    .object({
      title: Joi
        .string()
        .min(3)
        .max(256)
        .required(),
      description: Joi
        .string()
        .min(6)
        .required(),
    });
  return schema.validate(data);
};

module.exports = {
  validatePost,
};
