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


exports.updateMe = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and Email are required"
      });
    }

    
    const emailExists = await User.findOne({
      email,
      _id: { $ne: req.user.id }
    });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already in use"
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
