const mongoose = require("mongoose");
const Schema = mongoose.Schema

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId, ref: "User"
  },
  description: {
    type: String,
    required: false,
  },
  course_state: {
    type: Boolean,
    default: true,
  },
  course_img: {
    type: String,
    required: false,
  },
  students: {
    type: Number,
    default: 0,
  },
  qualification: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Course", courseSchema);
