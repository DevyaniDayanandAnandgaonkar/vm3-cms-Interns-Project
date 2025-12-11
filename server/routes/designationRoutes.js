const express = require("express");
const router = express.Router();

const {
  addDesignation,
  getDesignations,
  updateDesignation,
  patchDesignation,
  deleteDesignation
} = require("../controllers/designationController");

router.get("/", getDesignations);
router.post("/add", addDesignation);
router.put("/:id", updateDesignation);     // Full update
router.patch("/:id", patchDesignation);    // Partial update
router.delete("/:id", deleteDesignation);  // Delete

module.exports = router;
