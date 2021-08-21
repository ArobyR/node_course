const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.log("Can't connected to mongoDB...", err));

const courseShema = new mongoose.Schema({
  course_name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now() },
  public: Boolean,
});

const Course = mongoose.model("Courses", courseShema);

async function crearCurso() {
  const course = new Course({
    course_name: "Node.js",
    author: "Roboto",
    tags: ["Software development", "Back-end"],
    public: false,
  });
  const result = await course.save();
  console.log(result);

  //   await course.save((err, course) => {
  //     if (err) console.log(err);
  //   });
}

// crearCurso()

async function readCourses() {
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)
  // or()
  // and()

  const numberPage = 2;
  const sizePage = 10;
  //api/courses?numberPage=3&sizePage=10
  const courses = await Course
    //   .find()
    // .find({ price: { $gte: 10, $lte: 30 } })
    // .find({ price: { $in: [10, 15, 20] } })
    // .find({ course_name: { $eq: "Javascript" } })
    // find({ author: /^Robo/})
    // find({ course_name: /script$/ })
    // .find({ course_name: /.*s.*/ })
    .find()
    .skip((numberPage - 1) * sizePage)
    .limit(sizePage)
    .sort({ date: -1 })
    .select({ course_name: 1, tags: 1 });
  console.log(courses);
}
// readCourses();

async function updateCourse(id) {
  //   const course = await Course.findById(id);
  //   if (!course) {
  //     console.log("Course not found");
  //     return;
  //   }

  //   course.author = "Nio";
  //   course.public = false;
  //   course.save()
  console.log("Course update...");
  // course.set({
  //     author: "Nio",
  //     public: false
  // })

  const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        author: "Roboto",
        public: true,
      },
    }
  );
  console.log(result);
}

async function deleteCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  //    const resultDocument = await Course.findOneAndDelete(id)
  console.log(result);
}

// updateCourse("612015ceb02301521b056623");
deleteCourse("612015ceb02301521b056623")