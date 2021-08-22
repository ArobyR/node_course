const express = require("express");
const Course = require("../models/courses_model");
const route = express.Router();

route.get("/", (req, res) => {
  let courses = getCourse();
  courses
    .then((courseList) => res.json({ courses: courseList }))
    .catch((err) => res.status(400).json(err));
});

route.post("/", (req, res) => {
  let body = req.body;
  const result = createCourse(body);
  result
    .then((value) => res.json(value))
    .catch((err) => res.status(400).json(err));
});

route.put("/:id", (req, res) => {
  let body = req.body;
  let { id } = req.params;
  const result = updateCourse(id, body);
  result
    .then((courseUpdated) => res.json(courseUpdated))
    .catch((err) => res.status(400).json(err));
});

route.delete("/:id", (req, res) => {
  const result = deleteCourse(req.params.id);
  result
    .then((value) => res.json(value))
    .catch((err) => res.status(400).json(err));
});

async function createCourse(body) {
  const result = new Course({
    title: body.title,
    description: body.description,
  });
  return await result.save();
}

async function getCourse() {
  const course = await Course.find({ course_state: true });
  return course;
}

async function updateCourse(id, body) {
  let course = await Course.updateOne(
    { _id: id },
    {
      $set: {
        title: body.title,
        description: body.description,
      },
    }
  );
  return course;
}

async function deleteCourse(id) {
  let result = await Course.updateOne({ _id: id }, { course_state: false });
  return result;
}

module.exports = route;
