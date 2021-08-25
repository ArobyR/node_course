const express = require("express");
const route = express.Router();
const User = require("../models/users_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

route.post("/", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((data) => {
      if (data && bcrypt.compareSync(req.body.password, data.password)) {
        const jwtoken = jwt.sign(
          {
            user: {
              _id: data._id,
              user_name: data.user_name,
              email: data.email,
            },
          },
          config.get("configToken.SEED"),
          { expiresIn: config.get("configToken.expiration") }
        );
        // jwt.sign(
        //   { _id: data._id, user_name: data.user_name, email: data.email },
        //   "password"
        // );

        res.json({
          user: {
            _id: data._id,
            user_name: data.user_name,
            email: data.email,
          },
          jwtoken,
        });
        // res.send(jwtoken);
      } else {
        res.status(400).json({
          error: "ok",
          message: "User or password incorrect",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        error: "ok",
        message: "Services Error" + err,
      });
    });
});

module.exports = route;
