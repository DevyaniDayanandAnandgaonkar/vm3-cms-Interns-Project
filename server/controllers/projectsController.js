const db = require('../config/db');

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM projects');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM projects WHERE project_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new project
exports.createProject = async (req, res) => {
    try {
        const { project_name, description, category_id, client_id, department_id, assigned_to, status, created_by, Progress } = req.body;
        const [result] = await db.query(
            'INSERT INTO projects (project_name, description, category_id, client_id, department_id, assigned_to, status, created_by, Progress) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [project_name, description, category_id, client_id, department_id, assigned_to, status, created_by, Progress || 0]
        );
        res.status(201).json({ message: 'Project created successfully', project_id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update project
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { project_name, description, category_id, client_id, department_id, assigned_to, status, created_by, Progress } = req.body;
        const [result] = await db.query(
            'UPDATE projects SET project_name = ?, description = ?, category_id = ?, client_id = ?, department_id = ?, assigned_to = ?, status = ?, created_by = ?, Progress = ? WHERE project_id = ?',
            [project_name, description, category_id, client_id, department_id, assigned_to, status, created_by, Progress, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete project
exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM projects WHERE project_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
