const express = require("express");
const mongoose = require("mongoose");
const usersRoute = require("./routes/users");
const courseRoute = require("./routes/courses");
const auth = require("./routes/auth")
const config = require("config");
const { error404, generalErrorHandler } = require("./middlewares");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", usersRoute);
app.use("/api/courses", courseRoute);
app.use("/api/auth", auth)
app.use(error404)
app.use(generalErrorHandler)

mongoose
  .connect(config.get("configDB.HOST"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.log("Can't connected to mongoDB...", err));

app.listen(config.get("configServer.PORT"), () => {
  console.log("API RestFul OK");
});
