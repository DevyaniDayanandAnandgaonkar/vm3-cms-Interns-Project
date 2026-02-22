const express = require("express");
const {
  getProjectCount,
  getProjectByType,
  getProjectDetails,
  getCLientInfo,
  updateClientInfo,
  SendProjectRequest,
  createProfile,
  createSocialMediaPost,
  updateSocialMediaPostApprovalStatus,
  rejectSocialMediaPost,
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
clientRouter.post("/createProfile/:id", createProfile);
clientRouter.post("/createSocialMediaPost/:id", createSocialMediaPost);
clientRouter.put(
  "/updateSocialMediaPostApprovalStatus/:postId",
  updateSocialMediaPostApprovalStatus
);

// clientRouter.put("/updateSocialMediaPostApprovalStatus/:postId", updateSocialMediaPostApprovalStatus);
clientRouter.put("/rejectSocialMediaPost/:postId", rejectSocialMediaPost);
// POST /api/client-auth/login   — public
clientRouter.post("/login", clientAuthController.login);

// GET  /api/client-auth/profile — protected
clientRouter.get("/profile", verifyClientToken, clientAuthController.getProfile);

// GET /api/projects        — list all projects for logged-in client (protected)
clientRouter.get("/projects", verifyClientToken, projectController.getClientProjects);

// GET /api/projects/:id    — get single project by id, scoped to client (protected)
clientRouter.get("/projects/:id", verifyClientToken, projectController.getProjectById);

// GET /client/client-profile — get merged client + client_profile data (protected)
clientRouter.get("/client-profile", verifyClientToken, clientAuthController.getClientProfileData);

// PUT /client/update-basic-info — update basic info (protected)
clientRouter.put("/update-basic-info", verifyClientToken, clientAuthController.updateClientBasicInfo);

// PUT /client/update-website-info — update website info (protected)
clientRouter.put("/update-website-info", verifyClientToken, clientAuthController.updateClientWebsiteInfo);

// PUT /client/update-branding — update branding assets (protected)
clientRouter.put("/update-branding", verifyClientToken, clientAuthController.updateClientBranding);

// PUT /client/change-password — change password (protected)
clientRouter.put("/change-password", verifyClientToken, clientAuthController.changePassword);

// Social Media Posts routes
const socialMediaPostsController = require("../controllers/CLIENT/socialMediaPostsController");
clientRouter.get("/social-media-posts", verifyClientToken, socialMediaPostsController.getClientPosts);
clientRouter.put("/social-media-posts/:postId/approve", verifyClientToken, socialMediaPostsController.approvePost);
clientRouter.put("/social-media-posts/:postId/reject", verifyClientToken, socialMediaPostsController.rejectPost);

// Dashboard summary route
const dashboardController = require("../controllers/CLIENT/dashboardController");
clientRouter.get("/dashboard-summary", verifyClientToken, dashboardController.getDashboardSummary);

// Media Platform routes
const mediaPlatformController = require("../controllers/CLIENT/mediaPlatformController");
clientRouter.get("/media-platforms", verifyClientToken, mediaPlatformController.getMediaPlatforms);
clientRouter.post("/media-platforms", verifyClientToken, mediaPlatformController.addMediaPlatform);
clientRouter.put("/media-platforms/:id", verifyClientToken, mediaPlatformController.updateMediaPlatform);
clientRouter.delete("/media-platforms/:id", verifyClientToken, mediaPlatformController.deleteMediaPlatform);

module.exports = clientRouter;
