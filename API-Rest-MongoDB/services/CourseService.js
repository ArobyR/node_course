const Course = require("../models/courses_model");

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

module.exports = {
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse
}