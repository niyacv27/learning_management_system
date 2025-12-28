const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.addTeacher = async (req, res) => {
  try {
    console.log("=== ADD TEACHER HIT ===");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("USER:", req.user);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const image = req.file ? req.file.filename : null;

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "teacher",
      image
    });

    res.json({ message: "Teacher added successfully" });
  } catch (err) {
    console.error("ADD TEACHER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};





exports.getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" })
      .select("name email image");

    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
