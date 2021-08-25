const express = require("express");
const route = express.Router();
const checkToken = require("../middlewares/auth")
const {
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse
} = require("../services/CourseService")

route.get("/", checkToken, (req, res) => {
  let courses = getCourse();
  courses
    .then((courseList) => res.json({ courses: courseList }))
    .catch((err) => res.status(400).json(err));
});

route.post("/", checkToken, (req, res) => {
  let body = req.body;
  const result = createCourse(body);
  result
    .then((value) => res.json(value))
    .catch((err) => res.status(400).json(err));
});

route.put("/:id", checkToken, (req, res) => {
  let body = req.body;
  let { id } = req.params;
  const result = updateCourse(id, body);
  result
    .then((courseUpdated) => res.json(courseUpdated))
    .catch((err) => res.status(400).json(err));
});

route.delete("/:id", checkToken, (req, res) => {
  const result = deleteCourse(req.params.id);
  result
    .then((value) => res.json(value))
    .catch((err) => res.status(400).json(err));
});

module.exports = route;
