const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM employees');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error });
    }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
  const {
    department_id,
    role_id,
    designation_id,
    name,
    email,
    password,
    phone,
    joining_date,
    status,
    pf_number,
    dob,
    document_type,
  } = req.body;
  const document_file = req.file ? req.file.path : null;

  try {
    if (!name || !email) {
      return res.status(400).json({ message: 'name and email are required' });
    }

    // Check duplicate email
    const [existing] = await db.query('SELECT emp_id FROM employees WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const q = `INSERT INTO employees (department_id, role_id, designation_id, name, email, password, phone, joining_date, status, pf_number, dob, document_type, document_file)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
      department_id || null,
      role_id || null,
      designation_id || null,
      name,
      email,
      hashedPassword,
      phone || null,
      joining_date || null,
      status || 'Active',
      pf_number || 'NA',
      dob || null,
      document_type || null,
      document_file
    ];

    const [result] = await db.query(q, params);

    res.status(201).json({ message: 'Employee created successfully', emp_id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error });
  }
};

// Update an existing employee
exports.updateEmployee = async (req, res) => {
  const empId = req.params.id;
  const {
    department_id,
    role_id,
    designation_id,
    name,
    email,
    password,
    phone,
    joining_date,
    status,
    pf_number,
    dob,
    document_type,
  } = req.body;
  const document_file = req.file ? req.file.path : undefined;

  try {
    const [rows] = await db.query('SELECT * FROM employees WHERE emp_id = ?', [empId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Employee not found' });

    const updates = [];
    const params = [];

    if (department_id !== undefined) { updates.push('department_id = ?'); params.push(department_id); }
    if (role_id !== undefined) { updates.push('role_id = ?'); params.push(role_id); }
    if (designation_id !== undefined) { updates.push('designation_id = ?'); params.push(designation_id); }
    if (name !== undefined) { updates.push('name = ?'); params.push(name); }
    if (email !== undefined) { updates.push('email = ?'); params.push(email); }
    if (password) { 
        const hp = await bcrypt.hash(password, 10); 
        updates.push('password = ?'); 
        params.push(hp); 
    }
    if (phone !== undefined) { updates.push('phone = ?'); params.push(phone); }
    if (joining_date !== undefined) { updates.push('joining_date = ?'); params.push(joining_date); }
    if (status !== undefined) { updates.push('status = ?'); params.push(status); }
    if (pf_number !== undefined) { updates.push('pf_number = ?'); params.push(pf_number); }
    if (dob !== undefined) { updates.push('dob = ?'); params.push(dob); }
    if (document_type !== undefined) { updates.push('document_type = ?'); params.push(document_type); }
    if (document_file !== undefined) { updates.push('document_file = ?'); params.push(document_file); }

    if (updates.length === 0 && !req.file) {
      return res.status(400).json({ message: 'No fields provided for update' });
    }

    const q = `UPDATE employees SET ${updates.join(', ')} WHERE emp_id = ?`;
    params.push(empId);

    await db.query(q, params);

    res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error });
  }
};