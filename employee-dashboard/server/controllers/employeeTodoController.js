const db = require("../config/db");


// Get last 7 days todos
exports.getTodos = async (req, res) => {
  try {
    const user_id = req.user.emp_id;

    const [rows] = await db.query(`
      SELECT id, task_text, status, created_at
      FROM todos
      WHERE user_id = ?
      AND created_at >= NOW() - INTERVAL 7 DAY
      ORDER BY created_at DESC
    `, [user_id]);

    res.json(rows);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Add todo
exports.addTodo = async (req, res) => {
  try {
    const user_id = req.user.emp_id;
    const { task_text,status } = req.body;

    await db.query(
      "INSERT INTO todos (user_id, task_text,status) VALUES (?, ?,?)",
      [user_id, task_text,status]
    );

    //res.json({ message: "Todo added" });
     res.json({
  id: result.insertId,
  task_text,
  status,
  created_at: new Date(),
});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Update todo status
exports.updateTodo = async (req, res) => {
  try {
    const user_id = req.user.emp_id;
    const { status } = req.body;
    const todo_id = req.params.id;

    const [result] = await db.query(
      "UPDATE todos SET status=? WHERE id=? AND user_id=?",
      [status, todo_id, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Todo not found or not authorized" });
    }

    res.json({ message: "Todo updated successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const user_id = req.user.emp_id;
    const todo_id = req.params.id;
// Ensure the todo belongs to the user before deleting
    await db.query(
      "DELETE FROM todos WHERE id=? AND user_id=?",
      [todo_id, user_id]
    );
// No need to check affectedRows here, as we want to return success even if the todo was already deleted or doesn't belong to the user
    res.json({ message: "Todo deleted" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
