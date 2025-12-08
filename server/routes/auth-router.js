const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const { registerAdmin, loginAdmin } = require("../controllers/authController");
const { authenticate, authorizeRoles } = require("../middleware/auth");
const {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
} = require("../controllers/rolesController");
const {
  getAllAssociatePartners,
  getAssociatePartnerById,
  createAssociatePartner,
  updateAssociatePartner,
} = require("../controllers/associatePartners");

// Public route: Login
router.post("/login", loginAdmin);

// Register Admin – only super_admin or admin can do this
router.post(
  "/register-admin",
  authenticate,
  authorizeRoles([5, 1]),
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  registerAdmin
);

// Get logged-in admin details
router.get("/me", authenticate, (req, res) => {
  res.json({ user: req.user });
});

// roles route
router.get("/roles", getAllRoles);
router.get("/roles/:id", getRoleById);
router.post("/roles", createRole);
router.put("/roles/:id", updateRole);

// associate partners route
router.get("/associate-partners", getAllAssociatePartners);
router.get("/associate-partners/:id", getAssociatePartnerById);
router.post("/associate-partners", createAssociatePartner);
router.put("/associate-partners/:id", updateAssociatePartner);

module.exports = router;
