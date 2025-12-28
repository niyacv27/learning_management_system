const AttendanceMark = require("../models/AttendanceMark");

exports.addAttendanceAndMarks = async (req, res) => {
  try {
    const { courseId, studentId, attendance, marks } = req.body;

    let record = await AttendanceMark.findOne({
      course: courseId,
      student: studentId
    });

    if (record) {
      record.attendance = attendance;
      record.marks = marks;
      await record.save();
    } else {
      record = await AttendanceMark.create({
        course: courseId,
        student: studentId,
        teacher: req.user.id,
        attendance,
        marks
      });
    }

    res.json({ message: "Attendance & Marks saved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getMyAttendanceAndMarks = async (req, res) => {
  try {
    const records = await AttendanceMark.find({
      student: req.user.id
    })
      .populate("course", "title")
      .populate("teacher", "name");

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
