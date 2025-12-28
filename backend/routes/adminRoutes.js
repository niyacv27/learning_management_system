const router = require("express").Router();
const { addTeacher, getTeachers } = require("../controllers/adminController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const upload = require("../config/upload");


router.post(
  "/add-teacher",
  auth,
  role("admin"),
  upload.single("image"),
  addTeacher
);


router.get("/teachers", auth, role("admin"), getTeachers);

module.exports = router;
