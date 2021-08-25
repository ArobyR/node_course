const express = require("express");
const route = express.Router();
const validateUser = require("../helpers/validateUser");
const tokenValidation = require("../middlewares/auth")

const {
  createUser,
  getUser,
  updateUser,
  deactivateUser,
} = require("../services/UserService");

route.get("/", tokenValidation, (req, res) => {
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
  const { user_name, password, email } = req.body;

  const { error, value } = validateUser(user_name, password, email);

  if (!error) {
    const result = createUser(value);
    result
      .then((value) => res.json(value))
      .catch((err) => res.status(400).json({ error: err }));
  } else {
    res.status(400).json(error);
  }
});

route.put("/:email", tokenValidation, (req, res) => {
  const email = req.params.email;
  const body = req.body;
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

route.delete("/:email", tokenValidation, (req, res) => {
  const result = deactivateUser(req.params.email);
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

module.exports = route;
