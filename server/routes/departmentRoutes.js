const express = require("express");
const router = express.Router();
const { getDepartments } = require("../controllers/departmentController");

// GET /api/departments
router.get("/", getDepartments);

module.exports = router;
