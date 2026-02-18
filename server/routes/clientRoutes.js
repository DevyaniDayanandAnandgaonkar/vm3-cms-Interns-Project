const express = require("express");
const {
  getProjectCount,
  getProjectByType,
  getProjectDetails,
  getCLientInfo,
  updateClientInfo,
  SendProjectRequest,
} = require("../controllers/CLIENT/client");
const clientAuthController = require("../controllers/CLIENT/clientauthcontroller");
const projectController = require("../controllers/CLIENT/projectcontroller");
const verifyClientToken = require("../middleware/clientAuthMiddleware");

const clientRouter = express.Router();

// clientRouter.get("/projectCount", getProjectCount);
// clientRouter.get("/projectByType", getProjectByType);
// clientRouter.get("/projectDetails", getProjectDetails);
// clientRouter.get("/clientInfo", getCLientInfo);
// clientRouter.post("/updateClient", updateClientInfo);

clientRouter.get("/projectCount/:id", getProjectCount);
clientRouter.get("/projectByType/:id", getProjectByType);
clientRouter.get("/projectDetails/:id", getProjectDetails);
clientRouter.get("/clientInfo/:id", getCLientInfo);
clientRouter.post("/updateClient/:id", updateClientInfo);
clientRouter.post("/sendProjectRequest/:id", SendProjectRequest);

// POST /api/client-auth/login   — public
clientRouter.post("/login", clientAuthController.login);

// GET  /api/client-auth/profile — protected
clientRouter.get("/profile", verifyClientToken, clientAuthController.getProfile);

// GET /api/projects        — list all projects for logged-in client (protected)
clientRouter.get("/projects", verifyClientToken, projectController.getClientProjects);

// GET /api/projects/:id    — get single project by id, scoped to client (protected)
clientRouter.get("/projects/:id", verifyClientToken, projectController.getProjectById);

module.exports = clientRouter;
