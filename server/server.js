const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/auth-router");
const clientsRoutes = require("./routes/clients-router");
const projectRoutes = require("./routes/projectRoutes");
const designationRoutes = require("./routes/designationRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const cors = require("cors");

// Create app FIRST
const app = express();

// Enable CORS here
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Parse JSON
app.use(express.json());

// Use Auth Routes
app.use("/api", authRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/designations", designationRoutes);
app.use("/api/departments", departmentRoutes);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
