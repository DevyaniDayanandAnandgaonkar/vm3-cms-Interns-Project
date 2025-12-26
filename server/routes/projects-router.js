const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

// Get all projects
router.get('/', projectsController.getAllProjects);

// Get project by ID
router.get('/:id', projectsController.getProjectById);

// Create a new project
router.post('/', projectsController.createProject);

// Update project
router.put('/:id', projectsController.updateProject);

// Delete project
router.delete('/:id', projectsController.deleteProject);

module.exports = router;
