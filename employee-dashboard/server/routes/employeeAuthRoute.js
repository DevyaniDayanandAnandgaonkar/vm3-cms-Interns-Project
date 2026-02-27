// employeeAuthRoute.js - Routes for employee authentication (login and registration)
const express = require("express");
const router = express.Router();
const employeeAuthController = require("../controllers/employeeAuthController");

// Login route
router.post("/login", employeeAuthController.login);

// Registration route
router.post("/register", employeeAuthController.register);

module.exports = router;
