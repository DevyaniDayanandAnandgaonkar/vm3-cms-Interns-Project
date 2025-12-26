const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { getAllDesignations, createDesignation, updateDesignation, deleteDesignation } = require('../controllers/designationsController');
const { authenticate, authorizeRoles } = require('../middleware/auth');

// Get all designations
router.get('/', authenticate, getAllDesignations);

// Create designation
router.post(
  '/',
  authenticate,
  authorizeRoles([1, 5]), // Assuming similar roles for now, adjust if needed
  [
    body('designation_name').notEmpty(),
  ],
  createDesignation
);

// Update designation
router.put(
  '/:id',
  authenticate,
  authorizeRoles([1, 5]), // Assuming similar roles for now, adjust if needed
  updateDesignation
);

// Delete designation
router.delete(
  '/:id',
  authenticate,
  authorizeRoles([1, 5]), // Assuming similar roles for now, adjust if needed
  deleteDesignation
);

module.exports = router;