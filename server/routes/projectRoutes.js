const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.put("/update-status", projectController.updateProjectStatus);

module.exports = router;
