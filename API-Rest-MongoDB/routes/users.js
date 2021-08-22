const express = require("express");
const User = require("../models/users_model");
const route = express.Router();
const validateUser = require("../validateUser");

route.get("/", (req, res) => {
  const users = getUser();
  users
    .then((userList) =>
      res.json({
        users: userList,
      })
    )
    .catch((err) => res.status(400).json(err));
});

route.post("/", (req, res) => {
  let { user_name, email, password } = req.body;

  const { error, value } = validateUser(user_name, email, password);

  if (!error) {
    let result = createUser(value);
    result
      .then((value) => {
        res.json({ user: value });
      })
      .catch((err) => res.status(400).json(err));
  } else {
    res.status(400).json(error);
  }
});

route.put("/:email", (req, res) => {
  let email = req.params.email;
  let body = req.body;
  const { error } = validateUser(body.user_name, body.password);

  if (!error) {
    const response = updateUser(email, body);
    response
      .then((value) => res.json(value))
      .catch((err) => res.status(400).json({ error: err || "Error" }));
  } else {
    res.status(400).json(error);
  }
});

route.delete("/:email", (req, res) => {
  let result = deactivateUser(req.params.email);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
});

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
  let user = await User.updateOne(
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

module.exports = route;
