const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  addAttendanceAndMarks,
  getMyAttendanceAndMarks
} = require("../controllers/attendanceController");


router.post(
  "/add",
  auth,
  role("teacher"),
  addAttendanceAndMarks
);


router.get(
  "/my",
  auth,
  role("user"),
  getMyAttendanceAndMarks
);

module.exports = router;
