const db = require("../config/db");

exports.getEmployeeDashboard = async (req, res) => {
  try {
    const emp_id = req.user.emp_id;

    // 🔹 Active Tasks
    const [activeTasks] = await db.execute(
      "SELECT COUNT(*) as count FROM tasks WHERE created_by = ? AND status = 'inprogress'",
      [emp_id]
    );

    // 🔹 Pending Todos
    const [pendingTodos] = await db.execute(
      "SELECT COUNT(*) as count FROM todos WHERE user_id = ? AND status = 'pending'",
      [emp_id]
    );

    // 🔹 Leave Balance
    const [leaveBalance] = await db.execute(
      "SELECT total_leaves, used_leaves FROM leave_balance WHERE emp_id = ?",
      [emp_id]
    );

    let remainingLeave = 0;

    if (leaveBalance.length > 0) {
      remainingLeave =
        leaveBalance[0].total_leaves - leaveBalance[0].used_leaves;
    }

    // 🔹 Recent Tasks
    const [recentTasks] = await db.execute(
      "SELECT title, due_date, status, priority FROM tasks WHERE created_by = ? ORDER BY id DESC LIMIT 5",
      [emp_id]
    );

    // 🔹 Upcoming Leave Requests
    const [upcomingLeaves] = await db.execute(
      "SELECT leave_type, start_date, end_date, status FROM leave_requests WHERE emp_id = ? AND start_date >= CURDATE() ORDER BY start_date ASC LIMIT 5",
      [emp_id]
    );

    res.json({
      success: true,
      data: {
        activeTasks: activeTasks[0].count,
        pendingTodos: pendingTodos[0].count,
        leaveBalance: remainingLeave,
        performance: 94, // temporary static
        recentTasks,
        upcomingLeaves,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};