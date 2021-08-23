const Joi = require("joi");

function validateUser(user_name, password, email) {
  const schema = Joi.object({
    user_name: Joi.string().min(3).max(30).required(),

    password: Joi.string().min(3).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });

  if (email == undefined) {
    return schema.validate({
      user_name: user_name,
      password: password,
    });
  }
  
  return schema.validate({
      user_name: user_name,
      email: email,
      password: password
  })
}

module.exports = validateUser;
