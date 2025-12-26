const db = require('../config/db');

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM roles');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roles', error });
  }
};

// Create a new role
exports.createRole = async (req, res) => {
  const { role_name } = req.body;

  try {
    if (!role_name) {
      return res.status(400).json({ message: 'role_name is required' });
    }

    const q = 'INSERT INTO roles (role_name) VALUES (?)';
    const params = [role_name];

    const [result] = await db.query(q, params);

    res.status(201).json({ message: 'Role created successfully', role_id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating role', error });
  }
};

// Update an existing role
exports.updateRole = async (req, res) => {
  const roleId = req.params.id;
  const { role_name } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM roles WHERE role_id = ?', [roleId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Role not found' });

    if (role_name === undefined) {
      return res.status(400).json({ message: 'No fields provided for update' });
    }

    const q = 'UPDATE roles SET role_name = ? WHERE role_id = ?';
    const params = [role_name, roleId];

    await db.query(q, params);

    res.json({ message: 'Role updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating role', error });
  }
};

// Delete a role
exports.deleteRole = async (req, res) => {
  const roleId = req.params.id;

  try {
    const [rows] = await db.query('SELECT * FROM roles WHERE role_id = ?', [roleId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Role not found' });

    await db.query('DELETE FROM roles WHERE role_id = ?', [roleId]);

    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting role', error });
  }
};
