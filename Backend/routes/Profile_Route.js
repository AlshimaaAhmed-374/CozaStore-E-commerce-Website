const express = require("express");
const router = express.Router();
const profileController = require("../controllers/Profile_controller");
const requireAuth = require("../middleware/authMiddleware");

// GET user
//router.get("/:id", profileController.getUser);
router.get('/', requireAuth, profileController.getUser);// UPDATE profile
router.put("/update-me", requireAuth, profileController.updateProfile);

module.exports = router;  