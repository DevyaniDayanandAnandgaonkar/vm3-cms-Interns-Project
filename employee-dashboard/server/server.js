// server.js - Main entry point for the Express server
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes block //
// Employee Auth routes
app.use("/api/employee/auth", require("./routes/employeeAuthRoute"));
// Employee Todo routes
app.use("/api/employee-todos", require("./routes/employeeTodoRoutes"));
// Employee Task routes
app.use("/api/employee-tasks", require("./routes/employeeTaskRoutes"));
// Employee Leave routes
app.use("/api/employee-leaves", require("./routes/employeeLeaveRoute"));
// Employee Profile routes
app.use("/api/employee-profile", require("./routes/employeeProfileRoute"));
// Employee Dashboard routes
app.use("/api/employee-dashboard", require("./routes/employeeDashboardRoute"));
// Employee Social Media routes
app.use("/api/employee-social-media", require("./routes/employeeSocialMediaRoute"));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});

