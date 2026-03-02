const db = require('../config/db');

// Get all leave requests (with employee name)
exports.getAllLeaveRequests = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT lr.*, e.name AS employee_name, e.employee_id AS employee_code
            FROM leave_requests lr
            JOIN employees e ON e.emp_id = lr.emp_id
            ORDER BY lr.created_at DESC
        `);
        res.json({ success: true, leaves: rows });
    } catch (err) {
        console.error('GET LEAVES ERROR:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Approve or Reject a leave request
exports.updateLeaveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'approved' or 'rejected'

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status. Must be approved or rejected.' });
        }

        // 1. Get the leave request
        const [leaveRows] = await db.query(
            'SELECT * FROM leave_requests WHERE id = ?',
            [id]
        );

        if (leaveRows.length === 0) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        const leave = leaveRows[0];

        if (leave.status !== 'pending') {
            return res.status(400).json({ message: 'Leave request already processed' });
        }

        // 2. Update leave request status
        await db.query(
            'UPDATE leave_requests SET status = ? WHERE id = ?',
            [status, id]
        );

        // 3. If approved, update leave_balance
        if (status === 'approved') {
            const year = new Date(leave.start_date).getFullYear();

            if (leave.leave_type === 'general') {
                await db.query(
                    'UPDATE leave_balance SET used_leaves = used_leaves + ? WHERE emp_id = ? AND year = ?',
                    [leave.days, leave.emp_id, year]
                );
            }

            if (leave.leave_type === 'maternity') {
                await db.query(
                    'UPDATE leave_balance SET maternity_used = maternity_used + ? WHERE emp_id = ? AND year = ?',
                    [leave.days, leave.emp_id, year]
                );
            }
        }

        res.json({
            success: true,
            message: `Leave request ${status} successfully`
        });

    } catch (err) {
        console.error('UPDATE LEAVE STATUS ERROR:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
