const express = require("express");
const auth = require("../middleware/auth");
const {
  getMyCourses,
  getEnrolledStudents
} = require("../controllers/teacherController");

const router = express.Router();

router.get("/courses", auth, getMyCourses);
router.get("/students/:id", auth, getEnrolledStudents);

module.exports = router;
