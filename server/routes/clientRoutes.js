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
module.exports = clientRouter;
