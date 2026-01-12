const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const User = require("../models/User");

exports.createEnrollment = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const existing = await Enrollment.findOne({
      student: studentId,
      course: courseId
    });

    if (existing) {
      return res.status(400).json({
        message: "Already enrolled or enrollment pending"
      });
    }

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
      teacher: course.teacher
    });

    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getEnrollments = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "teacher") {
      filter.teacher = req.user.id;
    }

    if (req.user.role === "user") {
      filter.student = req.user.id;
    }

    const enrollments = await Enrollment.find(filter)
      .populate("student", "name email")
      .populate("course", "title duration description")
      .populate("teacher", "name");

    res.status(200).json(enrollments);
  } catch (err) {
    console.error("GET ENROLLMENTS ERROR:", err);
    res.status(500).json({
      message: "Failed to fetch enrollments"
    });
  }
};


exports.updateEnrollmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const enrollment = await Enrollment.findById(req.params.id).populate("course");

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    
    if (req.user.role === "admin") {
      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      enrollment.status = status;
      await enrollment.save();

      if (status === "approved") {
        await User.findByIdAndUpdate(enrollment.student, {
          $addToSet: { enrolledCourses: enrollment.course._id }
        });

        await Course.findByIdAndUpdate(enrollment.course._id, {
          $addToSet: { enrolledStudents: enrollment.student }
        });
      }

      return res.json(enrollment);
    }

    
    if (req.user.role === "teacher") {
      if (enrollment.teacher?.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      if (status !== "completed") {
        return res.status(400).json({
          message: "Teacher can only mark completed"
        });
      }

      enrollment.status = "completed";
      await enrollment.save();
      return res.json(enrollment);
    }

    return res.status(403).json({ message: "Access denied" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getTeacherEnrollments = async (req, res) => {
  try {
   
    const courses = await Course.find({ teacher: req.user.id }).select("_id");

    const enrollments = await Enrollment.find({
      course: { $in: courses.map(c => c._id) },
      status: "approved"
    })
      .populate("student", "name email")
      .populate("course", "title");

    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
