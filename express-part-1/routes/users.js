const express = require("express");
// const isUser = require("../isUser");
const validateUser = require("../validateUser");
const route = express.Router();

const users = [
  { id: 1, user_name: "Elliot" },
  { id: 2, user_name: "Stone" },
  { id: 3, user_name: "Aaron" },
  { id: 4, user_name: "Ana" },
];

route.get("/", (req, res) => {
  //  res.send(["XploitTech", "NewU", "UserG", "No-Name"]);
  res.send(users);
});

route.get("/:id", (req, res) => {
  // res.send(req.params)
  // res.send(req.query)
  let user = isUser(req.params.id);
  if (!user) res.status(404).send("User not found");
  res.send(user);
});

route.post("/", (req, res) => {
  const { error, value } = validateUser(req.body.user_name);

  if (!error) {
    const usuario = {
      id: users.length + 1,
      user_name: value.user_name,
    };
    users.push(usuario);
    res.send(usuario);
  } else {
    const message = error.details[0].message;
    res.status(400).send(message);
  }
});

route.put("/:id", (req, res) => {
  let user = isUser(req.params.id);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  const { error, value } = validateUser(req.body.user_name);

  if (error) {
    const message = error.details[0].message;
    res.status(400).send(message);
    return;
  }

  user.user_name = value.user_name;
  res.send(user);
});

route.delete("/:id", (req, res) => {
  let user = isUser(req.params.id);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  const index = users.indexOf(user);
  users.splice(index, 1);

  res.send(users);
});

function isUser(id) {
  return users.find((u) => u.id == parseInt(id));
}

module.exports = route;
