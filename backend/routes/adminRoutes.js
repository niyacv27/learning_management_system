const router = require("express").Router();
const { addTeacher, getTeachers } = require("../controllers/adminController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");


router.post(
  "/add-teacher",
  auth,
  role("admin"),
  addTeacher
);


router.get("/teachers", auth, role("admin"), getTeachers);

module.exports = router;
