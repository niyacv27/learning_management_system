const Course = require("../models/Course");

exports.getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user.id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEnrolledStudents = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("enrolledStudents", "name email");

    res.json(course.enrolledStudents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
