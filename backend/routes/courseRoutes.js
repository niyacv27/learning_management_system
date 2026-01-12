const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const controller = require("../controllers/courseController");

router.post("/", auth, role("admin"), controller.addCourse);
router.get("/", auth, controller.getCourses);
router.put("/:id", auth, role("admin"), controller.updateCourse);
router.delete("/:id", auth, role("admin"), controller.deleteCourse);




module.exports = router;
