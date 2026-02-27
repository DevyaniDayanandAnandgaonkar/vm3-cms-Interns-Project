const express = require("express");
const router = express.Router();
const profileController = require("../controllers/employeeProfileController");
const { verifyToken } = require("../middleware/employeeAuthMiddleware");

// Create Profile
router.post("/create", verifyToken, profileController.createEmployeeProfile);

// Get Profile (Logged-in employee)
router.get("/", verifyToken, profileController.getEmployeeProfile);

// Update Profile
router.put("/update", verifyToken, profileController.updateEmployeeProfile);

module.exports = router;