const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_state: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
