const express = require("express");
const router = express.Router();
const { applyLeave, getMyLeaves } = require("../controllers/employeeLeaveController");
const {getLeaveSummary} = require("../controllers/employeeLeaveController");

const {verifyToken} = require("../middleware/employeeAuthMiddleware");

router.post("/apply", verifyToken, applyLeave);
router.get("/", verifyToken, getMyLeaves);
router.get("/summary", verifyToken, getLeaveSummary);
module.exports = router;