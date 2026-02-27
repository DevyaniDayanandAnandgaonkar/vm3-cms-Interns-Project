const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/employeeAuthMiddleware");
const controller = require("../controllers/employeeSocialMediaController");

// All routes are protected by verifyToken middleware
router.get("/clients", verifyToken, controller.getClients);
router.get("/", verifyToken, controller.getPosts);
router.get("/:id", verifyToken, controller.getPostById);
router.post("/", verifyToken, controller.createPost);
router.put("/:id", verifyToken, controller.updatePost);
router.delete("/:id", verifyToken, controller.deletePost);
router.patch("/:id/status", verifyToken, controller.updateStatus);

module.exports = router;
