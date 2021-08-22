const User = require("../models/users_model");

async function createUser(body) {
  const result = new User({
    email: body.email,
    user_name: body.user_name,
    password: body.password,
  });
  return await result.save();
}

async function getUser() {
  const users = await User.find({ user_state: true });
  return users;
}

async function updateUser(email, body) {
  const user = await User.updateOne(
    { email: email },
    {
      $set: {
        user_name: body.user_name,
        password: body.password,
      },
    }
  );
  return user;
}

async function deactivateUser(email) {
  const result = await User.updateOne(
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