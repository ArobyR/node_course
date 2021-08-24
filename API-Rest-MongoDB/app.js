const express = require("express");
const mongoose = require("mongoose");
const usersRoute = require("./routes/users");
const courseRoute = require("./routes/courses");
const auth = require("./routes/auth")
const config = require("config")

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", usersRoute);
app.use("/api/courses", courseRoute);
app.use("/api/auth", auth)

mongoose
  .connect(config.get("configDB.HOST"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.log("Can't connected to mongoDB...", err));

app.listen(port, () => {
  console.log("API RestFul OK");
});
