const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const { createClient, updateClient, getAllClients } = require('../controllers/clientsController');

// Get all clients
router.get('/', getAllClients);
const { authenticate, authorizeRoles } = require('../middleware/auth');

// Create client — only admin/super-admin
router.post(
  '/',
  authenticate,
  authorizeRoles([1, 5]),
  [
    body('client_name').notEmpty(),
    body('email').isEmail(),
  ],
  createClient
);

// Update client — only admin/super-admin
router.put(
  '/:id',
  authenticate,
  authorizeRoles([1, 5]),
  updateClient
);

// Development-only: test create without auth
if (process.env.NODE_ENV === 'development') {
  router.post('/test-create', (req, res, next) => {
    // call createClient directly without auth for quick dev testing
    return createClient(req, res, next);
  });
}

module.exports = router;
