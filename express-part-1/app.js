const express = require("express");
const app = express(); // instancia del objeto
const port = process.env.PORT || 3000;

app.use(express.json());

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
  let user = users.find((u) => u.id == parseInt(req.params.id));
  if (!user) res.status(404).send("User not found");
  res.send(user);
});

app.post("/api/users", (req, res) => {
  if (req.body.nombre) {
    res.status(400).send("Send any name bigger than 2 chars");
    return;
  }

  const usuario = {
    id: users.length + 1,
    user_name: req.body.nombre,
  };
  users.push(usuario);
  res.send(usuario);
});

app.listen(port, () => {
  console.log(`Listerning at port: ${port}`);
});

// app.post() // envio de datos
// app.put() // actualizar
// app.delete() // eliminacion
