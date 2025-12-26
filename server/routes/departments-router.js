const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { getAllDepartments, createDepartment, updateDepartment, deleteDepartment } = require('../controllers/departmentsController');
const { authenticate, authorizeRoles } = require('../middleware/auth');

// Get all departments
router.get('/', authenticate, getAllDepartments);

// Create department
router.post(
  '/',
  authenticate,
  authorizeRoles([1, 5]),
  [
    body('department_name').notEmpty(),
  ],
  createDepartment
);

// Update department
router.put(
  '/:id',
  authenticate,
  authorizeRoles([1, 5]),
  updateDepartment
);

// Delete department
router.delete(
  '/:id',
  authenticate,
  authorizeRoles([1, 5]),
  deleteDepartment
);

module.exports = router;
