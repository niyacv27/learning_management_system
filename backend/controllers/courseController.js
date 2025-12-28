const Course = require("../models/Course");
const User = require("../models/User");


exports.addCourse = async (req, res) => {
  try {
    const { title, description, duration, features, teacher } = req.body;

    
    if (!title || !teacher) {
      return res.status(400).json({
        message: "Title and Teacher are required"
      });
    }

    const course = await Course.create({
      title,
      description,
      duration,
      features,
      teacher,              
      createdBy: req.user.id 
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("teacher", "name image"); 

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateCourse = async (req, res) => {
  try {
    const { title, description, duration, features, teacher } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, duration, features, teacher },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(updatedCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { enrolledStudents: userId }
    });

    
    await User.findByIdAndUpdate(userId, {
      $addToSet: { enrolledCourses: courseId }
    });

    res.json({ message: "Enrolled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
