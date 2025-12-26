const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const { createEmployee, updateEmployee } = require('../controllers/employeesController');
const { authenticate, authorizeRoles } = require('../middleware/auth');

// Get all employees
router.get('/', authenticate, authorizeRoles([1, 5]), async (req, res) => {
	try {
		const [rows] = await require('../config/db').query('SELECT * FROM employees');
		res.json(rows);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching employees', error });
	}
});

// Create employee — only admin/super-admin
router.post(
	'/',
	authenticate,
	authorizeRoles([1, 5]),
	upload.single('document_file'),
	[
		body('name').notEmpty(),
		body('email').isEmail(),
	],
	createEmployee
);

// Update employee — only admin/super-admin
router.put(
	'/:id',
	authenticate,
	authorizeRoles([1, 5]),
	upload.single('document_file'),
	updateEmployee
);

// Development-only: test create without auth
if (process.env.NODE_ENV === 'development') {
	router.post('/test-create', (req, res, next) => {
		// call createEmployee directly without auth for quick dev testing
		return createEmployee(req, res, next);
	});
}

module.exports = router;
