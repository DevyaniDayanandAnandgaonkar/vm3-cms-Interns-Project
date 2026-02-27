const pool = require("../config/db");

exports.getEmployeeTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [tasks] = await pool.query(`
      SELECT 
          t.id AS task_id,
          t.title,
          t.description,
          t.priority,
          t.status,
          t.due_date,
          IFNULL(tp.progress_percent,0) AS progress
      FROM tasks t
      JOIN task_assignees ta ON ta.task_id = t.id
      LEFT JOIN task_progress tp ON tp.task_id = t.id
      WHERE ta.user_id = ?
      ORDER BY t.due_date ASC
    `, [userId]);

    res.json({
      success: true,
      data: tasks
    });

  } catch (err) {
    next(err);
  }
};

exports.updateProgress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.taskId;
    const { progress } = req.body;

    // 1️⃣ Check if task belongs to employee
    const [task] = await pool.query(
      `SELECT * FROM task_assignees 
       WHERE task_id = ? AND user_id = ?`,
      [taskId, userId]
    );

    if (task.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to update this task"
      });
    }

    // 2️⃣ Update progress
    await pool.query(
      `UPDATE task_progress 
       SET progress_percent = ? 
       WHERE task_id = ?`,
      [progress, taskId]
    );

    // 3️⃣ Auto complete if 100%
    if (progress == 100) {
      await pool.query(
        `UPDATE tasks 
         SET status = 'completed' 
         WHERE id = ?`,
        [taskId]
      );
    }

    res.json({
      success: true,
      message: "Progress updated"
    });

  } catch (err) {
    next(err);
  }
};