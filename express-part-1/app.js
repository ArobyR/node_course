const debug = require("debug")("app:init")
const express = require("express");
const app = express(); // instancia del objeto
const users = require("./routes/users")
const morgan = require("morgan");
const config = require("config");
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/users", users)

// conf enviroments
console.log("App: " + config.get("name"));
console.log("DB server: " + config.get("configDB.host"));

// Using third-party middleware
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan is activited...")
}

app.get("/", (req, res) => {
  res.send("<h2>Hello from Express.js ;)</h2>");
  res.end();
});

app.listen(port, () => {
  console.log(`Listerning at port: ${port}`);
});
