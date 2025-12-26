const db = require('../config/db');

// Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM departments');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching departments', error });
  }
};

// Create a new department
exports.createDepartment = async (req, res) => {
  const { department_name, description, status } = req.body;

  try {
    if (!department_name) {
      return res.status(400).json({ message: 'department_name is required' });
    }

    const q = 'INSERT INTO departments (department_name, description, status) VALUES (?, ?, ?)';
    const params = [department_name, description || null, status || 'Active'];

    const [result] = await db.query(q, params);

    res.status(201).json({ message: 'Department created successfully', department_id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating department', error });
  }
};

// Update an existing department
exports.updateDepartment = async (req, res) => {
  const departmentId = req.params.id;
  const { department_name, description, status } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM departments WHERE department_id = ?', [departmentId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Department not found' });

    const updates = [];
    const params = [];

    if (department_name !== undefined) { updates.push('department_name = ?'); params.push(department_name); }
    if (description !== undefined) { updates.push('description = ?'); params.push(description); }
    if (status !== undefined) { updates.push('status = ?'); params.push(status); }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields provided for update' });
    }

    const q = `UPDATE departments SET ${updates.join(', ')} WHERE department_id = ?`;
    params.push(departmentId);

    await db.query(q, params);

    res.json({ message: 'Department updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating department', error });
  }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
  const departmentId = req.params.id;

  try {
    const [rows] = await db.query('SELECT * FROM departments WHERE department_id = ?', [departmentId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Department not found' });

    await db.query('DELETE FROM departments WHERE department_id = ?', [departmentId]);

    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting department', error });
  }
};
