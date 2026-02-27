const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/employeeAuthMiddleware");
const employeeTaskController = require("../controllers/employeeTaskcontroller");

router.get("/", verifyToken, employeeTaskController.getEmployeeTasks);

module.exports = router;

router.put(
  "/progress/:taskId",verifyToken,employeeTaskController.updateProgress);