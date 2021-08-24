const User = require("../models/users_model");
const bcrypt = require("bcrypt")

async function createUser(body) {
  const result = new User({
    user_name: body.user_name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10)
  });
  return await result.save();
}

async function getUser() {
  const users = await User.find({ user_state: true })
  .select({user_name: 1, email: 1});
  return users;
}

async function updateUser(email, body) {
  let user = await User.updateOne(
    { email: email },
    {
      $set: {
        user_name: body.user_name,
        password: bcrypt.hashSync(body.password, 10)
      },
    }
  );
  return user;
}

async function deactivateUser(email) {
  let result = await User.updateOne(
    { email: email },
    {
      $set: {
        user_state: false,
      },
    }
  );
  return result;
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deactivateUser
}