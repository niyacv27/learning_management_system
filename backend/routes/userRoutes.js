const express = require("express");
const auth = require("../middleware/auth");
const {
  getMe,
  updateMe
} = require("../controllers/userController");

const router = express.Router();


router.get("/me", auth, getMe);


router.put("/me", auth, updateMe);

module.exports = router;
