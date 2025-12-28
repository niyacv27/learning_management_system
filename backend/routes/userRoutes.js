const express = require("express");
const { getMe } = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/me", auth, getMe);
router.post("/enroll/:id", auth, require("../controllers/courseController").enrollCourse);

module.exports = router;
