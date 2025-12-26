const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// Get all categories
router.get('/', categoriesController.getAllCategories);

// Get category by ID
router.get('/:id', categoriesController.getCategoryById);

// Create a new category
router.post('/', categoriesController.createCategory);

// Update category
router.put('/:id', categoriesController.updateCategory);

// Delete category
router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;
