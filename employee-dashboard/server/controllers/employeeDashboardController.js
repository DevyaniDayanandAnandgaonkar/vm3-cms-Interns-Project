const db = require("../config/db");

exports.getEmployeeDashboard = async (req, res) => {
  try {
    const emp_id = req.user.emp_id;

    // 🔹 Employee Name
    const [empRows] = await db.execute(
      "SELECT name FROM employees WHERE emp_id = ?",
      [emp_id]
    );
    const name = empRows.length > 0 ? empRows[0].name : "Employee";

    // 🔹 Active Tasks (assigned to this employee, not completed)
    const [activeTasks] = await db.execute(
      `SELECT COUNT(*) as count 
       FROM tasks t
       JOIN task_assignees ta ON ta.task_id = t.id
       WHERE ta.user_id = ? AND t.status != 'completed'`,
      [emp_id]
    );

    // 🔹 Pending Todos
    const [pendingTodos] = await db.execute(
      "SELECT COUNT(*) as count FROM todos WHERE user_id = ? AND status = 'pending'",
      [emp_id]
    );

    // 🔹 Leave Balance
    const [leaveBalance] = await db.execute(
      "SELECT total_leaves, used_leaves, carry_forward FROM leave_balance WHERE emp_id = ?",
      [emp_id]
    );

    let remainingLeave = 0;
    if (leaveBalance.length > 0) {
      remainingLeave =
        (leaveBalance[0].total_leaves + (leaveBalance[0].carry_forward || 0)) -
        leaveBalance[0].used_leaves;
    }

    // 🔹 Recent Tasks (assigned to this employee)
    const [recentTasks] = await db.execute(
      `SELECT t.title, t.due_date, t.status, t.priority,
              IFNULL(tp.progress_percent, 0) AS progress
       FROM tasks t
       JOIN task_assignees ta ON ta.task_id = t.id
       LEFT JOIN task_progress tp ON tp.task_id = t.id
       WHERE ta.user_id = ?
       ORDER BY t.id DESC LIMIT 5`,
      [emp_id]
    );

    // 🔹 Upcoming Leave Requests
    const [upcomingLeaves] = await db.execute(
      "SELECT leave_type, start_date, end_date, status FROM leave_requests WHERE emp_id = ? AND start_date >= CURDATE() ORDER BY start_date ASC LIMIT 5",
      [emp_id]
    );

    // 🔹 Performance (based on completed tasks / total tasks)
    const [totalTasks] = await db.execute(
      `SELECT COUNT(*) as total FROM task_assignees WHERE user_id = ?`,
      [emp_id]
    );
    const [completedTasks] = await db.execute(
      `SELECT COUNT(*) as completed 
       FROM tasks t
       JOIN task_assignees ta ON ta.task_id = t.id
       WHERE ta.user_id = ? AND t.status = 'completed'`,
      [emp_id]
    );

    let performance = 0;
    if (totalTasks[0].total > 0) {
      performance = Math.round(
        (completedTasks[0].completed / totalTasks[0].total) * 100
      );
    }

    res.json({
      success: true,
      data: {
        name,
        activeTasks: activeTasks[0].count,
        pendingTodos: pendingTodos[0].count,
        leaveBalance: remainingLeave,
        performance,
        recentTasks,
        upcomingLeaves,
      },
    });

  } catch (error) {
    console.error("DASHBOARD ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};