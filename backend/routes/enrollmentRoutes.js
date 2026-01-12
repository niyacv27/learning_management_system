const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const controller = require("../controllers/enrollmentController");


router.post("/", auth, role("user"), controller.createEnrollment);


router.get(
  "/my",
  auth,
  role("user"),
  controller.getEnrollments
);


router.get(
  "/",
  auth,
  role("admin"),
  controller.getEnrollments
);


router.get(
  "/teacher",
  auth,
  role("teacher"),
  controller.getTeacherEnrollments
);


router.put(
  "/:id/status",
  auth,
  (req, res, next) => {
    if (req.user.role === "admin" || req.user.role === "teacher") {
      return next();
    }
    return res.status(403).json({ message: "Access denied" });
  },
  controller.updateEnrollmentStatus
);

module.exports = router;
