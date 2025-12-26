const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { getAllRoles, createRole, updateRole, deleteRole } = require('../controllers/rolesController');
const { authenticate, authorizeRoles } = require('../middleware/auth');

// Get all roles
router.get('/', authenticate, getAllRoles);

// Create role
router.post(
  '/',
  authenticate,
  authorizeRoles([1, 5]),
  [
    body('role_name').notEmpty(),
  ],
  createRole
);

// Update role
router.put(
  '/:id',
  authenticate,
  authorizeRoles([1, 5]),
  updateRole
);

// Delete role
router.delete(
  '/:id',
  authenticate,
  authorizeRoles([1, 5]),
  deleteRole
);

module.exports = router;
