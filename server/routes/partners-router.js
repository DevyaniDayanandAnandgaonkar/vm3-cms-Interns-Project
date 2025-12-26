const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const { createPartner, updatePartner, getAllPartners, deletePartner } = require('../controllers/partnersController');

// Get all partners
router.get('/', getAllPartners);
const { authenticate, authorizeRoles } = require('../middleware/auth');

// Create partner — only admin/super-admin
router.post(
  '/',
  authenticate,
  authorizeRoles([1, 5]),
  [
    body('partner_name').notEmpty(),
    body('email').isEmail(),
  ],
  createPartner
);

// Update partner — only admin/super-admin
router.put(
  '/:id',
  authenticate,
  authorizeRoles([1, 5]),
  updatePartner
);

// Delete partner — only admin/super-admin
router.delete(
    '/:id',
    authenticate,
    authorizeRoles([1, 5]),
    deletePartner
);

// Development-only: test create without auth
if (process.env.NODE_ENV === 'development') {
  router.post('/test-create', (req, res, next) => {
    // call createPartner directly without auth for quick dev testing
    return createPartner(req, res, next);
  });
}

module.exports = router;
