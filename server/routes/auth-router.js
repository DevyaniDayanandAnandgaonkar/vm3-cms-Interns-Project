const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const { registerAdmin, loginAdmin } = require('../controllers/authController');
const { authenticate, authorizeRoles } = require('../middleware/auth');

// Public route: Login
router.post('/login', loginAdmin);

// Register Admin – only super_admin or admin can do this
router.post(
  '/register-admin',
  authenticate,
  authorizeRoles([5, 1]), 
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ],
  registerAdmin
);


// Get logged-in admin details
router.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
