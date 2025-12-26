const db = require('../config/db');

// Get all designations
exports.getAllDesignations = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT d.designation_id, d.designation_name, d.department_id, dep.department_name FROM designation d LEFT JOIN departments dep ON d.department_id = dep.department_id');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching designations', error });
  }
};

// Create a new designation
exports.createDesignation = async (req, res) => {
  const { designation_name, department_id } = req.body;

  try {
    if (!designation_name) {
      return res.status(400).json({ message: 'designation_name is required' });
    }

    const q = 'INSERT INTO designation (designation_name, department_id) VALUES (?, ?)';
    const params = [designation_name, department_id || null];

    const [result] = await db.query(q, params);

    res.status(201).json({ message: 'Designation created successfully', designation_id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating designation', error });
  }
};

// Update an existing designation
exports.updateDesignation = async (req, res) => {
  const designationId = req.params.id;
  const { designation_name, department_id } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM designation WHERE designation_id = ?', [designationId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Designation not found' });

    const updates = [];
    const params = [];

    if (designation_name !== undefined) { updates.push('designation_name = ?'); params.push(designation_name); }
    if (department_id !== undefined) { updates.push('department_id = ?'); params.push(department_id); }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields provided for update' });
    }

    const q = `UPDATE designation SET ${updates.join(', ')} WHERE designation_id = ?`;
    params.push(designationId);

    await db.query(q, params);

    res.json({ message: 'Designation updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating designation', error });
  }
};

// Delete a designation
exports.deleteDesignation = async (req, res) => {
  const designationId = req.params.id;

  try {
    const [rows] = await db.query('SELECT * FROM designation WHERE designation_id = ?', [designationId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Designation not found' });

    await db.query('DELETE FROM designation WHERE designation_id = ?', [designationId]);

    res.json({ message: 'Designation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting designation', error });
  }
};