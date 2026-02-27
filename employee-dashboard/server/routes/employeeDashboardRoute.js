const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/employeeAuthMiddleware");
const dashboardController = require("../controllers/employeeDashboardController");

router.get("/", verifyToken, dashboardController.getEmployeeDashboard);

module.exports = router;