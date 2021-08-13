const Joi = require("joi");

function validateUser(user_name_) {
  const schema = Joi.object({
    user_name: Joi.string().min(3).max(30).required(),
  });
  return schema.validate({ user_name: user_name_ });
}

module.exports = validateUser;