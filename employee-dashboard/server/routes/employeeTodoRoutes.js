const express = require("express");
const router = express.Router();
const employeeTodoController = require("../controllers/employeeTodoController");
const { verifyToken } = require("../middleware/employeeAuthMiddleware");


// All routes are protected by verifyToken middleware
router.get("/", verifyToken, employeeTodoController.getTodos);
router.post("/", verifyToken, employeeTodoController.addTodo);
router.put("/:id", verifyToken, employeeTodoController.updateTodo);
router.delete("/:id", verifyToken, employeeTodoController.deleteTodo);

// Export the router
module.exports = router;