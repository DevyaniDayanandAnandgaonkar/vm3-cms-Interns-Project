const db = require('../config/db');

// Get all tasks with assignees
exports.getAllTasks = async (req, res) => {
    try {
        // Get all tasks
        const [tasks] = await db.query(`
            SELECT t.*, IFNULL(tp.progress_percent, 0) AS progress
            FROM tasks t
            LEFT JOIN task_progress tp ON tp.task_id = t.id
            ORDER BY t.due_date ASC
        `);

        // For each task, get assignees
        for (let task of tasks) {
            const [assignees] = await db.query(`
                SELECT e.emp_id, e.name, e.email
                FROM task_assignees ta
                JOIN employees e ON e.emp_id = ta.user_id
                WHERE ta.task_id = ?
            `, [task.id]);
            task.assignees = assignees;
        }

        res.json({ success: true, tasks });
    } catch (err) {
        console.error('GET TASKS ERROR:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, priority, due_date, assigned_to } = req.body;
        // assigned_to is an array of emp_ids

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        // admin_id is in `admin` table, not `users` table (which `created_by` FK references)
        const created_by = null;

        // 1. Insert task
        const [result] = await db.query(
            `INSERT INTO tasks (title, description, priority, status, start_date, due_date, created_by)
             VALUES (?, ?, ?, 'pending', CURDATE(), ?, ?)`,
            [title, description || null, priority || 'Low', due_date || null, created_by]
        );

        const taskId = result.insertId;

        // 2. Insert assignees
        if (assigned_to && Array.isArray(assigned_to) && assigned_to.length > 0) {
            const assigneeValues = assigned_to.map(userId => [taskId, userId]);
            await db.query(
                'INSERT INTO task_assignees (task_id, user_id) VALUES ?',
                [assigneeValues]
            );
        }

        // 3. Insert initial progress
        await db.query(
            'INSERT INTO task_progress (task_id, progress_percent) VALUES (?, 0)',
            [taskId]
        );

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            task_id: taskId
        });

    } catch (err) {
        console.error('CREATE TASK ERROR:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete related records first
        await db.query('DELETE FROM task_progress WHERE task_id = ?', [id]);
        await db.query('DELETE FROM task_assignees WHERE task_id = ?', [id]);
        const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ success: true, message: 'Task deleted successfully' });
    } catch (err) {
        console.error('DELETE TASK ERROR:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
