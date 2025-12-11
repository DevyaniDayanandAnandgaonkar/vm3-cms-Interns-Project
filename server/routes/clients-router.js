// const express = require('express');
// const router = express.Router();
// const { body } = require('express-validator');

// const { createClient, updateClient } = require('../controllers/clientsController');
// const { authenticate, authorizeRoles } = require('../middleware/auth');

// // Create client — only admin/super-admin
// router.post(
//   '/',
//   authenticate,
//   authorizeRoles([1, 5]),
//   [
//     body('client_name').notEmpty(),
//     body('email').isEmail(),
//   ],
//   createClient
// );

// // Update client — only admin/super-admin
// router.put(
//   '/:id',
//   authenticate,
//   authorizeRoles([1, 5]),
//   updateClient
// );

// // // Development-only: test create without auth
// // if (process.env.NODE_ENV === 'development') {
// //   router.post('/test-create', (req, res, next) => {
// //     // call createClient directly without auth for quick dev testing
// //     return createClient(req, res, next);
// //   });
// // }

// module.exports = router;



const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const { createClient,getAllClients, updateClient} = require('../controllers/clientsController');
const { authenticate, authorizeRoles } = require('../middleware/auth');

// Create client — only admin/super-admin
router.post(
  '/',
  authenticate,
  authorizeRoles([1, 5]),
  [
    body('client_name').notEmpty().withMessage('client_name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
  ],
  createClient
);

// Get all clients — only admin/super-admin
router.get(
  '/',
  authenticate,
  authorizeRoles([1, 5]),
  getAllClients
);
// Update client — only admin/super-admin
router.put(
  '/:id',
  authenticate,
  authorizeRoles([1, 5]),
  updateClient
);

module.exports = router;
