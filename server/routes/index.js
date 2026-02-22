const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authenticate, authorizeRoles } = require('../middleware/adminAuthMiddleware');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });

// Auth routes (public — no middleware)
const authController = require('../controllers/authController');
router.post('/auth/register', authController.registerAdmin);
router.post('/auth/login', authController.loginAdmin);

// ── All routes below this line are protected ──
router.use(authenticate);

// Categories routes
const categoriesController = require('../controllers/categoriesController');
router.get('/categories', categoriesController.getAllCategories);
router.get('/categories/:id', categoriesController.getCategoryById);
router.post('/categories', categoriesController.createCategory);
router.put('/categories/:id', categoriesController.updateCategory);
router.delete('/categories/:id', categoriesController.deleteCategory);

// Clients routes
const clientsController = require('../controllers/clientsController');
router.get('/clients', clientsController.getAllClients);
router.post('/clients', clientsController.createClient);
router.put('/clients/:id', clientsController.updateClient);

// Departments routes
const departmentsController = require('../controllers/departmentsController');
router.get('/departments', departmentsController.getAllDepartments);
router.post('/departments', departmentsController.createDepartment);
router.put('/departments/:id', departmentsController.updateDepartment);
router.delete('/departments/:id', departmentsController.deleteDepartment);

// Designations routes
const designationsController = require('../controllers/designationsController');
router.get('/designations', designationsController.getAllDesignations);
router.post('/designations', designationsController.createDesignation);
router.put('/designations/:id', designationsController.updateDesignation);
router.delete('/designations/:id', designationsController.deleteDesignation);

// Employees routes
const employeesController = require('../controllers/employeesController');
const employeesRouter = express.Router();
employeesRouter.get('/', employeesController.getAllEmployees);
employeesRouter.post('/', upload.single('document_file'), employeesController.createEmployee);
employeesRouter.put('/:id', upload.single('document_file'), employeesController.updateEmployee);
router.use('/employees', employeesRouter);
router.use('/auth/employees', employeesRouter);


// Partners routes
const partnersController = require('../controllers/partnersController');
router.get('/partners', partnersController.getAllPartners);
router.post('/partners', partnersController.createPartner);
router.put('/partners/:id', partnersController.updatePartner);
router.delete('/partners/:id', partnersController.deletePartner);

// Projects routes
const projectsController = require('../controllers/projectsController');
router.get('/projects', projectsController.getAllProjects);
router.get('/projects/:id', projectsController.getProjectById);
router.post('/projects', projectsController.createProject);
router.put('/projects/:id', projectsController.updateProject);
router.delete('/projects/:id', projectsController.deleteProject);

// Roles routes
const rolesController = require('../controllers/rolesController');
router.get('/roles', rolesController.getAllRoles);
router.post('/roles', rolesController.createRole);
router.put('/roles/:id', rolesController.updateRole);
router.delete('/roles/:id', rolesController.deleteRole);

module.exports = router;