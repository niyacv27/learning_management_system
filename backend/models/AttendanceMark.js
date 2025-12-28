const mongoose = require("mongoose");

const attendanceMarkSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  attendance: {
    type: Number, 
    default: 0
  },

  marks: {
    type: Number, 
    default: 0
  }
});

module.exports = mongoose.model("AttendanceMark", attendanceMarkSchema);
