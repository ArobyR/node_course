const Course = require("../models/courses_model");

async function createCourse(req) {
  const result = new Course({
    title: req.body.title,
    author: req.user._id,
    description: req.body.description,
  });
  return await result.save();
}

async function getCourse() {
  const course = await Course.find({ course_state: true }).populate("author", "user_name -_id");
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

module.exports = {
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
};
