const express = require("express");
const app = express(); // instancia del objeto
const logger = require("./logger")
const Joi = require("joi");
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.use(logger)

app.use(function (req, res, next) {
  console.log("Autenticando...")
  console.log(req.url)
  next()
})

const users = [
  { id: 1, user_name: "Elliot" },
  { id: 2, user_name: "Stone" },
  { id: 3, user_name: "Aaron" },
  { id: 4, user_name: "Ana" },
];

app.get("/", (req, res) => {
  res.send("<h2>Hello from Express.js ;)</h2>");
  res.end();
}); // peticion

app.get("/api/users", (req, res) => {
  //  res.send(["XploitTech", "NewU", "UserG", "No-Name"]);
  res.send(users);
});

app.get("/api/user/:id", (req, res) => {
  // res.send(req.params)
  // res.send(req.query)
  let user = isUser(req.params.id);
  if (!user) res.status(404).send("User not found");
  res.send(user);
});

app.post("/api/users", (req, res) => {
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

app.put("/api/users/:id", (req, res) => {
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

app.delete("/api/users/:id", (req, res) => {
  let user = isUser(req.params.id);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  const index = users.indexOf(user);
  users.splice(index, 1);

  res.send(users);
});

app.listen(port, () => {
  console.log(`Listerning at port: ${port}`);
});

function isUser(id) {
  return users.find((u) => u.id == parseInt(id));
}

function validateUser(user_name_) {
  const schema = Joi.object({
    user_name: Joi.string().min(3).max(30).required(),
  });
  return schema.validate({ user_name: user_name_ });
}

// app.post() // envio de datos
// app.put() // actualizar
// app.delete() // eliminacion
