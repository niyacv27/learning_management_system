const User = require("../models/User");

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("enrolledCourses");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
